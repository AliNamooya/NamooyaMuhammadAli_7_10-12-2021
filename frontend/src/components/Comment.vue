<template>
  <section>
    <div class="card">
      <h1 class="card__title">Commentaires</h1>
      <p class="card__subtitle">Le commentaire en question</p>
    </div>
    <div class="card">
      <h1 class="card__title">Commentaires</h1>
      <p class="card__subtitle">Le commentaire en question</p>
    </div>
    <div class="card">
      <h1 class="card__title">Commentaires</h1>
      <p class="card__subtitle">Le commentaire en question</p>
    </div>
  </section>
</template>

<script>
export default {
  name: "Comment",
};
</script>

<style>
section {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.card {
  margin-bottom: 20px;
}
</style>
