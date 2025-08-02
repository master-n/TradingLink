<template>
  <div>
    <component :is="currentHeader" />
  </div>


</template>

<script>
import AdminHeader from './admin-top-nav'
import TradespersonHeader from './navigation/home-menu'
import HomeOwnerHeader from './navigation/homeowner-menu'

export default {
  name: 'RoleBasedHeader',
  components: {
    AdminHeader,
    TradespersonHeader,
    HomeOwnerHeader
  },
  props: {
    userRole: {
      type: String,
      required: true
    }
  },
  computed: {
    currentHeader() {
      switch (this.userRole) {
        case 'admin':
          return 'AdminHeader';
        case 'tradesperson':
          return 'TradespersonHeader';
        case 'homeowner':
          return 'HomeOwnerHeader';
        default:
          return 'TradespersonHeader';
      }
    }
  }
}
</script>
