<template>
  <ViewContainer>
    <FlexboxLayout flexDirection="column" alignItems="center" justifyContent="space-around" height="80%">
      <Label text="Bump It!" fontSize="30" color="#8c8c8c"/>
      <GridLayout columns="*" rows="*" width="300" height="300">
        <FlexboxLayout col="0" row="0" flexWrap="wrap" alignItems="space-around" justifyContent="center">
          <Button text="Try me"></Button>
        </FlexboxLayout>
      </GridLayout>
    </FlexboxLayout>
  </ViewContainer>
</template>