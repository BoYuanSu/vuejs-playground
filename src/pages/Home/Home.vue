<template>
  <div class="home container">
    <div class="user-info">
      <div class="user-info-avatar">
        <img
          src="@/assets/image/avatar.jpg"
          alt=""
        >
      </div>
      <div class="user-info-name">
        <router-link
          data-no-turbolink="true"
          :to="{name: 'Home'}"
        >
          Bo Yuan Su
        </router-link>
      </div>
    </div>
    <div class="portfolios">
      <div
        v-for="portfolio in portfolios"
        :key="portfolio.name"
        class="portfolio"
      >
        <div class="portfolio-wrapper">
          <div class="portfolio-img-header">
            <img
              :src="portfolio.img"
              :alt="portfolio.name"
            >
          </div>
          <div class="portfolio-text">
            <p>{{ portfolio.name }}</p>
          </div>
          <div class="portfolio-link">
            <router-link :to="portfolio.link">
              前往
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      portfolios: [
        {
          img: 'https://picsum.photos/id/684/600/400',
          name: 'OhBot 行事曆',
          link: { name: 'OhBot' }
        },
        {
          img: 'https://picsum.photos/id/684/600/400',
          name: 'OhBot 行事曆1',
          link: { name: 'OhBot' }
        },
        {
          img: 'https://picsum.photos/id/684/600/400',
          name: 'OhBot 行事曆2',
          link: { name: 'OhBot' }
        },
        {
          img: 'https://picsum.photos/id/684/600/400',
          name: 'OhBot 行事曆2',
          link: { name: 'OhBot' }
        }
      ]
    }
  }
}
</script>
