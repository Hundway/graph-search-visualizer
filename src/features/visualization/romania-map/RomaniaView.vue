<script setup lang="ts">
  import { ref, computed, onMounted } from 'vue';
  import * as d3 from 'd3-force';
  import Node from '@/components/Node.vue';
  import Road from '@/components/Road.vue';
  import Header from '@/components/Header.vue';
  import RomaniaFooter from './RomaniaFooter.vue';
  import citiesCoordinates from '@/assets/romania-cities-coordinates.json' with { type: 'json' };
  import connections from '@/assets/romania-roads.json' with { type: 'json' };

  const VIEWBOX_W = 1600; 
  const VIEWBOX_H = 1100; 
  const PADDING = 100;
  const NODE_SIZE = 110;

  const cities = ref(citiesCoordinates.map(city => ({ ...city, state: 'empty' })));
  const nodes = ref<any[]>([]);

  const isDragging = ref(false);
  const draggedNodeTitle = ref<string | null>(null);
  let simulation: d3.Simulation<any, undefined>;

  const anchoredCities = computed(() => {
    const xValues = cities.value.map(c => c.x);
    const yValues = cities.value.map(c => c.y);
    const minX = Math.min(...xValues);
    const maxX = Math.max(...xValues);
    const minY = Math.min(...yValues);
    const maxY = Math.max(...yValues);
    return cities.value.map(city => ({
      ...city,
      targetX: ((city.x - minX) / (maxX - minX)) * (VIEWBOX_W - 2 * PADDING) + PADDING,
      targetY: ((city.y - minY) / (maxY - minY)) * (VIEWBOX_H - 2 * PADDING) + PADDING
    }));
  });

  const paths = computed(() => {
    return connections.map(conn => {
      const startNode = nodes.value.find(n => n.title === conn.source);
      const endNode = nodes.value.find(n => n.title === conn.destination);
      return {
        x1: startNode?.x ?? 0,
        y1: startNode?.y ?? 0,
        x2: endNode?.x ?? 0,
        y2: endNode?.y ?? 0
      };
    });
  });

  function toggleCityState(title: string) {
    const node = nodes.value.find(n => n.title === title);
    if (!node) return;

    if (node.state === 'start' || node.state === 'end') {
      node.state = 'empty';
    }
    else {
      const hasStart = nodes.value.some(n => n.state === 'start');
      const hasEnd = nodes.value.some(n => n.state === 'end');
      if (!hasStart) node.state = 'start';
      else if (!hasEnd) node.state = 'end';
    }
  }

  onMounted(() => {
    nodes.value = anchoredCities.value.map(c => ({ 
      ...c, 
      x: c.targetX, 
      y: c.targetY 
    }));
    simulation = d3.forceSimulation(nodes.value)
      .force("charge", d3.forceManyBody().strength(-200))
      .force("x", d3.forceX((d: any) => d.targetX).strength(0.15))
      .force("y", d3.forceY((d: any) => d.targetY).strength(0.15))
      .on("tick", () => {
        nodes.value = [...nodes.value]; 
      });
  });

  function handleDrag(event: MouseEvent) {
    if (!isDragging.value || !draggedNodeTitle.value) return;
    
    const node = nodes.value.find(n => n.title === draggedNodeTitle.value);
    if (node) {
      const svg = document.getElementById('map-svg') as any;

      const pt = svg.createSVGPoint();
      pt.x = event.clientX;
      pt.y = event.clientY;

      const cursor = pt.matrixTransform(svg.getScreenCTM().inverse());
      node.fx = cursor.x;
      node.fy = cursor.y;
      
      simulation.alpha(0.1).restart();
    }
  }

  function startDragging(title: string) {
    isDragging.value = true;
    draggedNodeTitle.value = title;
  }

  function stopDragging() {
    isDragging.value = false;
    draggedNodeTitle.value = null;
    nodes.value.forEach(n => {
      n.fx = null;
      n.fy = null;
    });
    simulation.alpha(0.9).restart();
  }
</script>

<template>
  <main 
    id="romania-view" 
    @mousemove="handleDrag" 
    @mouseup="stopDragging" 
    @mouseleave="stopDragging"
  >
    <Header title="Romania Map" />
    <section>
      <div id="romania-map-container">
        <svg id="map-svg" :viewBox="`0 0 ${VIEWBOX_W} ${VIEWBOX_H}`">
          <Road v-for="(path, i) in paths" :key="i" v-bind="path" />
          
          <Node 
            v-for="node in nodes"
            :key="node.title"
            v-bind="node"
            :size="NODE_SIZE"
            @mousedown="startDragging(node.title)"
            @click="toggleCityState(node.title)"
          />
        </svg>
      </div>
    </section>
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