<template>
    <div class="single-answer">
        <p class="text-muted">
            <strong>{{ answer.author }}</strong> ha risposto il {{ answer.created_at }}
        </p>
        <p>{{ answer.body }}</p>
        <div v-if="isAnswerAuthor" class="answer-owner mb-4">
            <router-link
                :to="{ name: 'answer-editor', params: { id: answer.id } }"
                class="btn btn-sm btn-outline-secondary mr-2"> <span>Modifica</span>
            </router-link>
            <button
                @click="triggerDeleteAnswer"
                class="btn btn-sm btn-outline-danger">Cancella</button>
        </div>
        <div v-else class="like-answer">
            <button
                class="btn btn-sm"
                @click="toggleLike"
                :class="{
                    'btn-danger': userLikedAnswer,
                    'btn-outline-danger': !userLikedAnswer,
                    }">
                <strong>Mi Piace [{{ likesNumber }}]</strong>
            </button>
        </div>
        <hr>
    </div>
</template>

<script>
import { apiService } from '../common/api.service'
export default {
    name: "AnswerComponent",
    props: {
        answer: {
            type: Object,
            required: true
        },
        requestUser: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            userLikedAnswer: this.answer.user_has_voted,
            likesNumber: this.answer.likes_count
        }
    },
    computed: {
        isAnswerAuthor(){
            return this.answer.author === this.requestUser
        },
    },
    methods: {
        triggerDeleteAnswer(){
            this.$emit("delete-answer", this.answer)
        },
        toggleLike() {
            this.userLikedAnswer == false
                ? this.likeAnswer()
                : this.unLikeAnswer()
        },
        likeAnswer() {
            this.userLikedAnswer = true;
            this.likesNumber += 1;
            let endpoint = `/api/answers/${this.answer.id}/like/`;
            apiService(endpoint, "POST");
        },
        unLikeAnswer() {
            this.userLikedAnswer = false;
            this.likesNumber -= 1;
            let endpoint = `/api/answers/${this.answer.id}/like/`;
            apiService(endpoint, "DELETE");
        },
    },
}
</script>

<style>

</style>