<script setup lang="ts">
import { CmsBlock } from "@shopware-pwa/types";
import { getCmsLayoutConfiguration } from "@shopware-pwa/helpers-next";
import { resolveCmsComponent } from "@shopware-pwa/composables-next";
const props = defineProps<{
  content: CmsBlock;
}>();

const DynamicRender = () => {
  const { resolvedComponent, componentName, isResolved } = resolveCmsComponent(
    props.content
  );

  if (resolvedComponent) {
    if (!isResolved)
      return h("div", {}, "Problem resolving component: " + componentName);

    const { cssClasses, layoutStyles } = getCmsLayoutConfiguration(
      props.content
    );

    const containerStyles = {
      backgroundColor: layoutStyles.backgroundColor,
      backgroundImage: layoutStyles.backgroundImage,
    };

    layoutStyles.backgroundColor = null;
    layoutStyles.backgroundImage = null;

    return h(
      "div",
      {
        style: containerStyles,
      },
      h(resolvedComponent, {
        content: props.content,
        style: layoutStyles,
        class: cssClasses,
      })
    );
  }
  return h("div", {}, "Loading...");
};
</script>

<template>
  <DynamicRender />
</template>
