<template>
    <div v-if="question">
        <h1>{{ question}}</h1>
        <h2>------------------------</h2>
        <h3>{{ question.options}}</h3>
    </div>
</template>

<script>
export default {
    props:['question'],
    setup(){

    }
}
</script>

<style>

</style>