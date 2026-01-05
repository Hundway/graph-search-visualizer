<script setup lang="ts">
  import { computed } from 'vue';

  import Node from '@/components/Node.vue';
  import Road from '@/components/Road.vue';

  import cities from '@/assets/romania-cities-coordinates.json' with { type: 'json' };
  import connections from '@/assets/romania-roads.json' with { type: 'json' };

  import RomaniaFooter from './RomaniaFooter.vue';
  import Header from '@/components/Header.vue';

  const VIEWBOX_W = 1600; 
  const VIEWBOX_H = 1100; 
  const PADDING = 100;
  const NODE_SIZE = 110;

  const scaledCities = computed(() => {
    const xValues = cities.map(c => c.x);
    const yValues = cities.map(c => c.y);
    const minX = Math.min(...xValues);
    const maxX = Math.max(...xValues);
    const minY = Math.min(...yValues);
    const maxY = Math.max(...yValues);

    return cities.map(city => ({
      ...city,
      scaledX: ((city.x - minX) / (maxX - minX)) * (VIEWBOX_W - 2 * PADDING) + PADDING,
      scaledY: ((city.y - minY) / (maxY - minY)) * (VIEWBOX_H - 2 * PADDING) + PADDING
    }));
  });

  const paths = computed(() => {
    return connections.map(conn => {
      const start = scaledCities.value.find(c => c.title === conn.source);
      const end = scaledCities.value.find(c => c.title === conn.destination);
      
      return {
        ...conn,
        x1: start?.scaledX ?? 0,
        y1: start?.scaledY ?? 0,
        x2: end?.scaledX ?? 0,
        y2: end?.scaledY ?? 0
      };
    });
  });
</script>

<template>
  <main id="romania-view">
    <Header title="Romania Map" />
    <section>
      <div id="romania-map-container">
        <div id="romania-map">
          <svg :viewBox="`0 0 ${VIEWBOX_W} ${VIEWBOX_H}`" preserveAspectRatio="xMidYMid meet" id="map-svg">
            <Road 
              v-for="(path, index) in paths" 
              :key="'road-' + index"
              :x1="path.x1" :y1="path.y1"
              :x2="path.x2" :y2="path.y2"
            />
            <Node 
              v-for="city in scaledCities" 
              :key="city.title" 
              :x="city.scaledX" :y="city.scaledY"
              :size="NODE_SIZE" 
              :title="city.title"
            />
          </svg>
        </div>
      </div>
    </section>
    <RomaniaFooter/>
  </main>
</template>

<style scoped>
  #romania-view {
    display: flex;
    flex-direction: column;
    justify-content: center;
    max-width: 1000px;
    gap: 20px;
  }

  #romania-map-container {
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    border: 4px solid var(--bg-light);
  }

  #romania-map {
    display: flex;
    width: 100%;
    max-width: 1000px;
  }

  svg {
    max-width: 100%;
    max-height: 100%;
  }

  main {
    width: 100%;
    height: 100%;
  }
</style>