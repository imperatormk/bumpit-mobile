<template>
  <ViewContainer :loading="!loaded">
    <FlexCol slot="scrollable">
      <FlexRow justifyContent="center" alignItems="center" width="100%">
        <Avatar :avatar="user.avatar" shouldSelect/>
      </FlexRow>
      <Split big/>

      <FlexCol>
        <Label class="category" text="Profile"/>
        <Split big/>

        <FlexRow justifyContent="space-between">
          <Label class="label" text="Username"/>
          <Label :text="'@' + user.username"/>
        </FlexRow>
        <Split big/>

        <FlexRow justifyContent="space-between">
          <Label class="label" text="First name"/>
          <Label :text="user.name"/>
        </FlexRow>
        <Split big/>

        <FlexRow justifyContent="space-between">
          <Label class="label" text="Last name"/>
          <Label :text="user.surname"/>
        </FlexRow>
        <Split big/>

        <FlexRow justifyContent="space-between">
          <Label class="label" text="Location"/>
          <Label :text="user.location"/>
        </FlexRow>
        <Split big/>

        <FlexRow justifyContent="space-between">
          <Label class="label" text="Shipping address"/>
          <Label text="Apostol Zdravevski 34 7000"/>
        </FlexRow>
        <Split big/>

        <FlexRow justifyContent="space-between">
          <Label class="label" text="Bio"/>
          <Label :text="user.bio"/>
        </FlexRow>
      </FlexCol>
      <Split size="30"/>

      <FlexCol>
        <Label class="category" text="Account"/>
        <Split big/>

        <FlexRow justifyContent="space-between">
          <Label class="label" text="Contact email"/>
          <Label :text="user.email"/>
        </FlexRow>
        <Split big/>

        <FlexRow justifyContent="space-between">
          <Label class="label" text="Payout settings"/>
          <Label text="arrowhere"/>
        </FlexRow>
        <Split big/>

        <FlexRow justifyContent="space-between">
          <Label class="label" text="Disable trades"/>
          <Switch/>
        </FlexRow>
      </FlexCol>
      <Split size="30"/>

      <FlexCol>
        <Label class="category" text="Localization"/>
        <Split big/>

        <FlexRow justifyContent="space-between">
          <Label class="label" text="Language"/>
          <Label text="English"/>
        </FlexRow>
        <Split big/>

        <FlexCol>
          <Label class="label" text="Currency"/>
          <Split/>
          <ScrollView orientation="horizontal" :scrollBarIndicatorVisible="false">
            <FlexRow>
              <StackLayout v-for="(currency, idx) in currencies" :key="idx" @tap="selectCurrency(idx)" :backgroundColor="profile.selectedCurrency === idx ? 'black' : 'white'" padding="5 10">
                <Label :text="currency" :color="profile.selectedCurrency === idx ? 'white' : 'black'"/>
              </StackLayout>
            </FlexRow>
          </ScrollView>
        </FlexCol>
      </FlexCol>
      <Split size="30"/>

      <FlexCol>
        <Label class="category" text="Notifications"/>
        <Split big/>

        <FlexRow justifyContent="space-between">
          <Label class="label" text="Someone like your listing"/>
          <Switch/>
        </FlexRow>
        <Split big/>

        <FlexRow justifyContent="space-between">
          <Label class="label" text="Someone followed you"/>
          <Switch/>
        </FlexRow>
        <Split big/>

        <FlexRow justifyContent="space-between">
          <Label class="label" text="Facebook friend listed an item"/>
          <Switch/>
        </FlexRow>
      </FlexCol>
      <Split size="30"/>

      <StateButton text="Save changes"/>
      <Split/>
      <StateButton @onTap="logout" v-if="user" text="Logout"/>
    </FlexCol>
  </ViewContainer>
</template>

<script>
import Avatar from '@/components/blocks/user/Avatar'
import Auth from '@/services/auth'

export default {
  mounted() {
    this.getAuthUser()
  },
  data: () => ({
    currencies: ['USD', 'EUR', 'GBP', 'CAD', 'AUD', 'JPY', 'USD', 'EUR', 'GBP', 'CAD', 'AUD', 'JPY'],
    profile: {
      selectedCurrency: 0
    },
    user: { avatar: '' },
    loaded: false
  }),
  methods: {
    selectCurrency(idx) {
      this.profile.selectedCurrency = idx
    },
    getAuthUser() {
      this.loaded = false
      return Auth.getAuthUser()
        .then((user) => {
          this.user = user
          this.loaded = true
        })
    },
    logout() {
      Auth.logout()
        .then((resp) => {
          this.getAuthUser()
        })
    }
  },
  components: {
    Avatar
  }
}
</script>

<style lang="scss" scoped>
.category {
  font-variant: small-caps;
  text-transform: uppercase;
  font-weight: bold;
}
.label {
  color: black;
}
</style>
