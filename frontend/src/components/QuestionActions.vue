<template>
  <div class="question-actions mt-2 mb-3">
      <router-link
        :to="{ name: 'question-editor', params: { slug: slug } }"
        class="btn btn-sm btn-outline-secondary mr-1"
        ><span>Modifica</span>
      </router-link>
      <button class="btn btn-sm btn-outline-danger"
        @click="deleteQuestion">Cancella</button>
  </div>
</template>

<script>
import { apiService } from "../common/api.service"
export default {
    name: "QuestionActions",
    props: {
        slug: {
            type: String,
            required: true
        }
    },
    methods: {
        async deleteQuestion(){
            let endpoint = `/api/questions/${this.slug}/`
            try{
                await apiService(endpoint, "DELETE")
                    .then(()=>{
                        this.$router.push("/")
                    })
            }catch(err){
                console.log(err)
            }
        }
    },
}
</script>

<style>

</style>