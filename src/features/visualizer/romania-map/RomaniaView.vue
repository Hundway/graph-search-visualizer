<script setup lang="ts">
  import { ref, computed, onMounted, onUnmounted } from 'vue';
  import { forceX, forceY, forceSimulation, forceManyBody, type Simulation } from 'd3-force';
  import { useDrag } from '@/composables/mouse';
  import City from '@/components/City.vue';
  import Road from '@/components/Road.vue';
  import Header from '@/components/Header.vue';
  import RomaniaFooter from './RomaniaFooter.vue';
  import citiesCoordinates from '@/assets/romania-cities-coordinates.json' with { type: 'json' };
  import connections from '@/assets/romania-roads.json' with { type: 'json' };

  const VIEWBOX_W = 1600; 
  const VIEWBOX_H = 1100; 
  const PADDING = 100;
  const CITY_SIZE = 110;

  const cities = ref<any[]>([]);
  const mapSvg = ref<SVGSVGElement | null>(null);
  const simulation = ref<Simulation<any, any> | null>(null);
  
  const { onDragStart, onDragMove, onDragEnd } = useDrag();

  const handleCityDrag = (event: MouseEvent) => {
    onDragMove(event, (city, clientX, clientY) => {
      const map = mapSvg.value;
      if (!map) return;

      const pt = map.createSVGPoint();
      pt.x = clientX;
      pt.y = clientY;

      const weight = 1;
      const svgPoint = pt.matrixTransform(map.getScreenCTM()?.inverse());
      const { x, y } = svgPoint;

      city.fx = city.x + (x - city.x) * weight;
      city.fy = city.y + (y - city.y) * weight;
      simulation.value?.alpha(0.1).restart();
    });
  };

  const stopCityDrag = () => {
    onDragEnd((city) => {
      city.fx = null;
      city.fy = null;
      simulation.value?.alpha(0.5).restart();
    });
  };

  const anchoredCities = computed(() => {
    const xValues = citiesCoordinates.map(c => c.x);
    const yValues = citiesCoordinates.map(c => c.y);
    const minX = Math.min(...xValues), maxX = Math.max(...xValues);
    const minY = Math.min(...yValues), maxY = Math.max(...yValues);
    
    return citiesCoordinates.map(city => ({
      ...city,
      state: 'empty',
      x: ((city.x - minX) / (maxX - minX)) * (VIEWBOX_W - 2 * PADDING) + PADDING,
      y: ((city.y - minY) / (maxY - minY)) * (VIEWBOX_H - 2 * PADDING) + PADDING
    }));
  });

  const paths = computed(() => connections.map(connection => {
    const s = cities.value.find(city => city.title === connection.source);
    const d = cities.value.find(city => city.title === connection.destination);
    return { x1: s?.x ?? 0, y1: s?.y ?? 0, x2: d?.x ?? 0, y2: d?.y ?? 0 };
  }));

  function toggleCityState(city: any) {
    if (city.state !== 'empty') city.state = 'empty';
    else {
      const hasStart = cities.value.some(n => n.state === 'start');
      const hasEnd = cities.value.some(n => n.state === 'end')
      city.state = !hasStart ? 'start' : !hasEnd ? 'end' : 'empty';
    }
  }

  onMounted(() => {
    cities.value = anchoredCities.value.map(c => ({ ...c, x: c.x, y: c.y }));
    simulation.value = forceSimulation(cities.value)
      .force("charge", forceManyBody().strength(-150))
      .force("x", forceX((d: any) => d.x).strength(0.1))
      .force("y", forceY((d: any) => d.y).strength(0.1))
      .on("tick", () => cities.value = [...cities.value]);
  });
</script>

<template>
  <main id="romania-view">
    <Header title="Romania Map" />
    <div id="romania-map-container"
      @mousemove="handleCityDrag"
      @mouseup="stopCityDrag"
      @mouseleave="stopCityDrag"
    >
      <svg ref="mapSvg" id="map-svg" :viewBox="`0 0 ${VIEWBOX_W} ${VIEWBOX_H}`">
        <Road v-for="(path, i) in paths" :key="i" v-bind="path" />
        <City 
          v-for="city in cities" :key="city.title" v-bind="city" :size="CITY_SIZE"
          @mousedown.prevent="onDragStart(city)"
          @click="toggleCityState(city)"
        />
      </svg>
    </div>
    <RomaniaFooter/>
  </main>
</template>

<style scoped>
  main {
    width: 100%;
    height: 100%;
  }

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
    border: 1px solid var(--border);
    border-radius : 8px;
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
</style>