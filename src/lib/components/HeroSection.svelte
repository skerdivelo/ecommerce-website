<script>
  import { ButtonVariant } from "../../types/Button";
  import Button from "./Button.svelte";
  import ArrowIcon from "$lib/icons/ArrowIcon.svelte";
  import laptopImage from "$lib/images/laptop.png";
</script>

<h1
  class="flex flex-col text-[18vw] leading-none pt-6 text-fw-blue uppercase font-serif text-center items-center justify-center sm:text-center sm:items-center"
>SKAND Best<br />
  <div class="flex text-[12vw] relative justify-center">
    <span class="bg-tech-rocket bg-cover bg-clip-text text-transparent">
      Tech
    </span>
    <div class="w-[30vw] relative" />
    <img
      src={laptopImage}
      alt="Esclusivi Laptop, Prezzi Bassi, Acquista Ora!"
      class="absolute left-[7vw] -top-[11vw] w-[43vw]"
    />
    <div class="flex flex-col gap-5 justify-center">
      <span class="bg-game-rocket bg-cover bg-clip-text text-transparent">
        Store
      </span>
      <div
        class="w-[32vw] lg:w-[25vw] flex-col gap-5 sm:gap-10 hidden sm:visible sm:flex justify-center"
      >
        <span class="block text-sm font-sans normal-case">
          Scopri la nostra selezione curata di laptop all'avanguardia progettati per
          potenziare il tuo viaggio digitale.
        </span>
        <Button variant={ButtonVariant.SECONDARY} dClass="w-full">
          Esplora Laptop
          <ArrowIcon />
        </Button>
      </div>
    </div>
  </div>
</h1>
<div class="w-full flex-col gap-8 flex sm:hidden mt-[20vw] justify-center">
  <span
    class="block text-sm font-sans normal-case w-full sm:w-2/3 text-justify"
  >
    Scopri la nostra selezione curata di laptop all'avanguardia progettati per potenziare
    il tuo viaggio digitale.
  </span>
  <Button variant={ButtonVariant.SECONDARY} dClass="w-full">
    Esplora Laptop
    <ArrowIcon />
  </Button>
</div>