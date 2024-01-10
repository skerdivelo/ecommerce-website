<script>
  import Footer from "../lib/components/Footer.svelte";
  import Header from "../lib/components/Header.svelte";
  import "./styles.css";
</script>

<div class="app font-body text-fw-blue">
  <Header />
  <main>
    <slot />
  </main>
  <Footer />
</div>
