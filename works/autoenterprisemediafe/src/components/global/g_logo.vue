<template>
  <icon-logo-c v-if="$route.path=='/login'" />
  <icon-logo @backHome="backHome" v-else />
</template>

<script>
import IconLogo from '../icons/IconLogo'
import IconLogoC from '../icons/IconLogoC'
import { backHome } from '../../tools/index'
export default {
  components: { IconLogo, IconLogoC },
  data () {
    return {
      logo: require('../../assets/imgs/logo5.png'),
      logo1: require('../../assets/imgs/logo4.png')
    }
  },
  methods: {
    backHome () {
      backHome()
    },
    skip () {
      const role = localStorage.getItem('role') || ''
      if (this.$route.path !== '/login' && this.$route.path !== '/register') {
        try {
          if (role === '2') this.$router.push('/manageMer')
          else if (role === '1') this.$router.push('/publicAssets')
        } catch (error) {}
      }
    }
  }
}
</script>

<style lang="less" scoped>
svg {
  margin: 0 35px 0 0;
}
</style>
