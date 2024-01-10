<script lang="ts">
  import { ButtonVariant } from "../../types/Button";

  export let variant: ButtonVariant;
  export let dClass = "";
  export let onClick = () => {};
</script>

<button
  class={`flex gap-1 items-center justify-center rounded-lg py-3
   text-sm font-sans normal-case font-medium ${dClass} ${
    variant === ButtonVariant.PRIMARY
      ? "bg-fw-blue text-white"
      : "border border-fw-blue text-fw-blue"
  }`}
  on:click={onClick}
>
  <slot />
</button>
