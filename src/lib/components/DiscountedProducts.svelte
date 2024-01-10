<script>
  import { products } from "$lib/data/products";
  import CarouselIcon from "$lib/icons/CarouselIcon.svelte";
  import { Splide, SplideSlide, SplideTrack } from "@splidejs/svelte-splide";
  import ProductCard from "./ProductCard.svelte";
</script>

<Splide
  class="mt-[10vw]"
  hasTrack={false}
  options={{
    type: "loop",
    gap: 30,
    perPage: 4,
    perMove: 1,
    breakpoints: {
      1200: {
        padding: 20,
        perPage: 3,
      },
      840: {
        padding: 10,
        perPage: 2,
        arrows: false,
      },
      520: {
        padding: 7,
        perPage: 1,
        arrows: false,
      },
    },
  }}
>
  <SplideTrack>
    {#each products as product}
      <SplideSlide>
        <ProductCard {product} />
      </SplideSlide>
    {/each}
  </SplideTrack>

  <div class="splide__arrows">
    <button class="splide__arrow splide__arrow--prev">
      <CarouselIcon />
    </button>
    <button class="splide__arrow splide__arrow--next">
      <CarouselIcon />
    </button>
  </div>
</Splide>
