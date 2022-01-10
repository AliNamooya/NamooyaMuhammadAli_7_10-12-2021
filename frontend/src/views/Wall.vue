<template>
  <Header />
  <NewPost />
  <Comment />
</template>

<script>
import Header from "../components/Header.vue";
import NewPost from "../components/NewPost.vue";
import Comment from "../components/Comment.vue";
export default {
  name: "Wall",
  components: {
    Header,
    NewPost,
    Comment,
  },
};
</script>

<style scoped>
nav {
  flex: none;
}
</style>
