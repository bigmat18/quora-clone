<template>
  <div class="single-question mt-2">
      <div v-if="notFound" class="container">
            <h1 id="notfound">Domanda Non Trovata</h1>
    </div>
      <div v-else class="container">
          <h1>{{ question.content }}</h1>
            <QuestionActions
                v-if="isOwner"
                :slug="slug"/>
            <p class="mb-0">Domanda aggiunta da
                <span class="author-name">{{ question.author }}</span>
            </p>
            <p>{{ question.created_at }}</p>
            <hr>
            <template v-if="userHasAnswered">
                <p class="answer-added">Hai risposto a questa domanda</p>
            </template>
            <template v-else-if="showForm">
                <form class="card" @submit.prevent="onSubmit">
                    <div class="card-header px-3">
                        Aggiungi una risposta alal domanda
                    </div>
                    <div class="card-block">
                        <textarea
                            v-model="newAnswerBody"
                            class="form-control" 
                            rows="5"
                            placeholder="Aggiung una risposta alla domanda">
                        </textarea>
                    </div>
                    <div class="card-footer px-3">
                        <button type="submit" class="btn btn-sm btn-success">Aggiungi Risposta</button>
                    </div>
                </form>
                <p class="error mt-3">{{ error }}</p>
            </template>
            <template v-else>
                <button 
                    class="btn btn-sm btn-success"
                    @click="showForm = true">
                    Rispondi alla domanda</button>
            </template>
            <hr>
            <AnswerComponent
                v-for="(answer, index) in answers"
                :answer="answer"
                :requestUser="requestUser"
                :key="index"
                @delete-answer="deleteAnswer"
            />
            <div class="my-4">
                <p v-show="loadingAnswers">loadingAnswers</p>
                <button 
                    v-show="next"
                    @click="getQuestionAnswers"
                    class="bnt btn-sm btn-outline-success"
                    >Carica Ancora</button>
            </div>
      </div>
  </div>
</template>

<script>
import AnswerComponent from "../components/Answer.vue"
import { apiService } from "../common/api.service"
import QuestionActions from "../components/QuestionActions.vue"

export default {
    name: "Question",
    props: {
        slug: {
            type: String,
            required: true
        }
    },
    components: {
        AnswerComponent,
        QuestionActions
    },
    data(){
        return{
            question: {},
            loadingAnswers: false,
            answers: [],
            userHasAnswered: false,
            showForm: false,
            newAnswerBody: null,
            error: null,
            next: null,
            requestUser: null
        }
    },
    computed: {
        isOwner(){
            return this.question.author === this.requestUser
        },
        notFound(){
            return this.question["detail"]
        }
    },
    methods: {
        setPageTitle(title){
            document.title = title
        },
        getQuestionData(){
            let endpoint = `/api/questions/${this.slug}/`
            apiService(endpoint)
                .then(data=>{
                    this.question = data
                    this.userHasAnswered = data.user_has_answered
                    this.setPageTitle(data.content)
                    
                })
        },
        getQuestionAnswers(){
            let endpoint = `/api/questions/${this.slug}/answers/`
            if(this.next) endpoint = this.next
            this.loadingAnswers = true
            apiService(endpoint)
                .then(data => {
                    this.answers.push(...data.results)
                    this.loadingAnswers = false
                    if(data.next) this.next = data.next
                    else this.next = null
                })
        },
        onSubmit(){
            if(this.newAnswerBody){
                let endpoint = `/api/questions/${this.slug}/answer/`
                apiService(endpoint, "POST", { body: this.newAnswerBody })
                    .then(data => {
                        this.newAnswerBody = null
                        this.answers.unshift(data)
                    })
                this.showForm = false
                this.newAnswerBody = null
                this.userHasAnswered = true
                if(this.error) this.error = null
            }
            else this.error = "Il campo non puo essere vuoto"
        },
        setRequestUser(){
            this.requestUser = window.localStorage.getItem("username")
        },
        async deleteAnswer(answer) {
            let endpoint = `/api/answers/${answer.id}/`;
            try {
                await apiService(endpoint, "DELETE");
                // this.answers.splice(this.answers.indexOf(answer), 1);
                this.$delete(this.answers, this.answers.indexOf(answer));
                this.userHasAnswered = false;
            }
            catch (err) {
                console.log(err);
            }
        }
    },
    created() {
        this.getQuestionData()
        this.getQuestionAnswers()
        this.setRequestUser()
    },
}
</script>


<style>
.answer-added {
    color: green;
    font-weight: bold;
}
.error {
    color: red;
    font-weight: bold;
}
</style>