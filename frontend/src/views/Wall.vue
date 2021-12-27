<template>
  <Header />
  <Comment />
</template>

<script>
import Header from "../components/Header.vue";
import Comment from "../components/Comment.vue";
export default {
  name: "Wall",
  components: {
    Header,
    Comment,
  },
  mounted: function () {
    this.$store.dispatch("showPosts");
  },
};
</script>

<style scoped></style>
