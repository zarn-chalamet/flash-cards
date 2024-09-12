<template>
  <div>
    <h3>
        Question {{ current + 1}} / {{ quiz.questions.length }}
    </h3>
  </div>
</template>

<script>
export default {
    props: ['quiz','current'],
    setup(){
        
    }
}
</script>

<style>

</style>