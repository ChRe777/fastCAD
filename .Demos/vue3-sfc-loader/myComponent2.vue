<script>
export default {
  data() {
    return {
      greeting: 'Hello World!'
    }
  },
  template: `<h1 class='greeting2'> Greetings {{ greeting }}</h1>`
}
</script>

<style>
    .greeting2 {
        color: green;
        font-weight: bold;
    }
</style>