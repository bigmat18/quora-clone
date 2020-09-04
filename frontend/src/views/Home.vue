<template>
  <div class="home-view">
    <div class="container">
      <div class="mt-2">
        <div v-for="question in questions"
          :key="question.pk">
          <p class="mb-0">Domanda aggiunta da
            <span class="author-name">{{ question.author }}</span>
          </p>
          <h2>
          <router-link
            :to="{ name: 'question', params: { slug: question.slug } }"
            class="question-link">
              {{ question.content }}
          </router-link>
          </h2>
          <p>Risposte: {{ question.answers_count }}</p>
          <hr>
        </div>
      </div>
      <div class="my-4">
             <p v-show="loadingQuestions">...loading...</p>
             <button
                v-show="next"
                @click="getQuestions"
                class="btn btn-sm btn-outline-success"
                >Carica Ancora
             </button>
      </div>
    </div>
  </div>
</template>

<script>
import { apiService } from "../common/api.service"
export default {
  name: "Home",
  data() {
    return {
        questions: [],
        next: null,
        loadingQuestions: false
    }
  },
  created(){
      this.getQuestions();
      document.title = "QuestionTime"
  },
  methods:{
      getQuestions(){
        let endpoint = "api/questions/"
        if(this.next) endpoint = this.next
        this.loadingQuestions = true
        apiService(endpoint)
          .then(data=>{
            this.questions.push(...data.results)
            this.loadingQuestions = false
            if (data.next) this.next = data.next
            else this.next = null
          })
      }
  }
};
</script>


<style media="screen">
    .author-name {
        font-weight: bold;
        color: #DC3545;
    }
    .question-link {
        font-weight: bold;
        color: black;
    }
    .question-link:hover {
        color: #343A40;
        text-decoration: none;
    }
</style>
