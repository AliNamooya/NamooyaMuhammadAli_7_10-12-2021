<template>
  <div id="wall">
    <Header />
    <NewPost />
    <FeedPosts />
  </div>
</template>

<script>
import Header from "../components/Header.vue";
import NewPost from "../components/NewPost.vue";
import FeedPosts from "../components/FeedPosts.vue";
export default {
  name: "Wall",
  components: {
    Header,
    NewPost,
    FeedPosts,
  },
};
</script>

<style scoped>
nav {
  flex: none;
}

#wall {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 100%;
  width: 100%;
  background-image: linear-gradient(62deg, #fbab7e 0%, #f7ce68 100%);
  min-height: 100vh;
}
</style>
