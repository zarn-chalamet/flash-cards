<template>
  <div class="card">
    <h3>{{flash.title}}</h3>
    <div class="term-b">
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
        background-color: #f0f0f0;
        border: 1px solid #ddd;
        border-radius: 8px;
        padding: 16px; 
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); 
        text-align: left; 
    }
    .term-b{
      display: inline-block;
      background-color: aquamarine;
      padding: 0 15px;
      border-radius: 5px;
    }
</style>