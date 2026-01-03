<script setup lang="ts">
  import Legend from './Legend.vue'
  import IconButton from '@/components/IconButton.vue'
  import ButtonContainer from '@/components/ButtonContainer.vue'

  const emit = defineEmits(['clear', 'generate'])
</script>

<template>
  <footer id="grid-footer">
    <Legend />
    <ButtonContainer>
      <IconButton id="bt-generate" iconUrl="/src/assets/icons/generate.svg" title="Generate" @click="$emit('generate')"/>
      <IconButton id="bt-clear" iconUrl="/src/assets/icons/clear.svg" title="Clear" @click="$emit('clear')"/>
    </ButtonContainer>
  </footer>
</template>

<style scoped>
  #grid-footer {
    display: flex;
    justify-content: space-between
  }
</style>