<template>
  <div class="mask-map">
    <router-link to="/">
      home
    </router-link>
    <div class="">
      <div class="d-flex align-items-stretch mask-map-main no-gutters">
        <div class="col-3 px-3">
          <div class="form-group d-flex">
            <label
              for="cityName"
              class="col-form-label mr-2 text-right"
            >縣市</label>
            <div class="flex-fill">
              <select
                id="cityName"
                v-model="select.city"
                class="form-control"
              >
                <option value="">
                  請選擇
                </option>
                <option
                  v-for="c in citys"
                  :key="c.value"
                  :value="c.value"
                >
                  {{ c.name }}
                </option>
              </select>
            </div>
          </div>
          <div class="form-group d-flex">
            <label
              for="area"
              class="col-form-label mr-2 text-right"
            >地區</label>
            <div class="flex-fill">
              <select
                id="area"
                v-model="select.area"
                class="form-control"
              >
                <option value="">
                  請選擇
                </option>
                <option
                  v-for="a in areas(select.city)"
                  :key="a.value"
                  :value="a.value"
                >
                  {{ a.name }}
                </option>
              </select>
            </div>
          </div>
        </div>
        <div class="col-9">
          <div id="map" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import L from 'leaflet'

import cityData from '@/assets/json/citys.json'

export default {
  name: 'MaskMap',
  data () {
    return {
      map: null,
      select: {
        city: '',
        area: ''
      }
    }
  },
  computed: {
    citys () {
      return cityData.map(city => ({ name: city.CityName, value: city.CityName }))
    },
    areas () {
      const currentCity = this.city
      return (value) => {
        const currentCityData = cityData.filter(city => city.CityName === currentCity)[0]
        if (!currentCityData) return []
        return currentCityData.AreaList.map(area => ({ name: area.AreaName, value: area.AreaName }))
      }
    }
  },
  mounted () {
    const mymap = L.map('map', {
      center: [24.9873, 121.5101],
      zoom: 17
    })
    this.map = mymap
    // L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    //   attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    //   maxZoom: 18,
    //   id: 'mapbox/streets-v11',
    //   tileSize: 512,
    //   zoomOffset: -1,
    //   accessToken: 'your.mapbox.access.token'
    // }).addTo(mymap)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 20
    }).addTo(mymap)
  }
}
</script>

<style lang="scss" src="./MaskMap.scss"></style>
