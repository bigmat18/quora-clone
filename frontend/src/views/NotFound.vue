<template>
    <div class="not-found">
      <div class="container mt-3">
          <h1 id="notfound">{{ message }}</h1>
      </div>
    </div>
</template>

<script>
export default {
name: "NotFound",
    data() {
        return {
            message: "404 - Pagina Non Trovata"
        }
    }
}
</script>

<style>
#notfound {
    color: red;
    text-align: center;
}
</style>