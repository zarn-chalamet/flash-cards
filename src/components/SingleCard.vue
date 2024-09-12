<template>
  <div class="card">
    
    <div class="card-text">
      <h3>{{flash.title}}</h3>
      <h4>{{flash.cards.length}} terms</h4>
    </div>
  </div>
</template>

<script>
export default {
  props:['flash']
}
</script>

<style>
    .card{
      width: 310px;
      overflow: hidden;
      border-radius: 5%;
      box-shadow: 1px 1px 10px rgba(0,0,0,0.1);
      margin-bottom: 35px;
      margin-right: 20px;
      cursor: pointer;
      background-color: rgb(215, 240, 249);
      }
    .card .card-text {
      padding: 0 20px
    }
</style>