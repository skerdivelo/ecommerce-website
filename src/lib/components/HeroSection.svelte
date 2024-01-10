<script>
  import { ButtonVariant } from "../../types/Button";
  import Button from "./Button.svelte";
  import ArrowIcon from "$lib/icons/ArrowIcon.svelte";
  import laptopImage from "$lib/images/laptop.png";
</script>

<h1
  class="flex flex-col text-[18vw] leading-none pt-6 text-fw-blue uppercase font-serif text-center items-center sm:text-start sm:items-start"
>
  Elevate your <br />
  <div class="flex text-[12vw] relative">
    <span class="bg-tech-rocket bg-cover bg-clip-text text-transparent">
      Tech
    </span>
    <div class="w-[30vw] relative" />
    <img
      src={laptopImage}
      alt="Exclusive Laptops, Low Prices, Buy Now!"
      class="absolute left-[7vw] -top-[11vw] w-[43vw]"
    />
    <div class="flex flex-col gap-5">
      <span class="bg-game-rocket bg-cover bg-clip-text text-transparent">
        Game
      </span>
      <div
        class="w-[32vw] lg:w-[25vw] flex-col gap-5 sm:gap-10 hidden sm:visible sm:flex"
      >
        <span class="block text-sm font-sans normal-case">
          Discover our curated selection of cutting-edge laptops designed to
          empower your digital journey.
        </span>
        <Button variant={ButtonVariant.SECONDARY} dClass="w-full">
          Explore Laptops
          <ArrowIcon />
        </Button>
      </div>
    </div>
  </div>
</h1>
<div class="w-full flex-col gap-8 flex sm:hidden mt-[20vw]">
  <span
    class="block text-sm font-sans normal-case w-full sm:w-2/3 text-justify"
  >
    Discover our curated selection of cutting-edge laptops designed to empower
    your digital journey.
  </span>
  <Button variant={ButtonVariant.SECONDARY} dClass="w-full">
    Explore Laptops
    <ArrowIcon />
  </Button>
</div>
