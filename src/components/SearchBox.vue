<template>
  <div class="search-container">
    <input type="text" class="search-input" placeholder="Search..." v-model="search">
  </div>
</template>

<script>
import { watch, ref } from 'vue';

export default {
  props:['source'],
  setup(props,context){
    let search = ref("");
    let filterdSource = ref(null);
  
    watch(search,()=>{
      filterdSource.value = props.source.filter(
        (item) => 
          item.title.toLowerCase().includes(search.value.toLowerCase())
      );
      console.log(filterdSource.value);
      context.emit("emitSource",filterdSource.value);
    })
    return {search,filterdSource};
  }
}
</script>

<style>

.search-container {
  display: flex;
  align-items: left;
  justify-content: left;
  width: 100%;
  margin: 20px 0;
}

.search-input {
  width: 300px;
  padding: 12px 20px; 
  font-size: 12px;
  border: 2px solid #d6d6dc;
  border-radius: 50px;
  outline: none;
  transition: all 0.3s ease;
}

.search-input:focus {
  width: 350px; 
  border-color: #a2a7aa;
  box-shadow: 0 5px 15px rgba(138, 138, 139, 0.2);
}


</style>