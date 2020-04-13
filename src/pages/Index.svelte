<div class="flex justify-center items-center w-screen h-screen app">
  <div class="bg-white border-gray-500 shadow-lg sm:w-full md:w-2/3 lg:w-1/2 xl:w-1/3">
    <div class="h-1 strip"></div>
    <div class="content">
      <div class="flex justify-center">
        <img class="h-6" src={logoImage} alt="">
      </div>
      <div class="pt-20 pb-20 pl-5 pr-5 flex justify-center">
        {#if timeElapsed === '-'}
        <div class="text-xl">
          Calculating...
        </div>
        {:else}
        <div class="text-xl break-all">
          It took <strong class="text-blue-500">{timeElapsed}s</strong> to fully load this page (~1.3MB unzipped).
        </div>
        {/if}
      </div>
      <div class="pt-10 text-sm flex justify-center">
        <div>Powered by</div>
        <div class="ml-1 w-5 h-5 text-red-500">
          <HeartIcon></HeartIcon>
        </div>
        <div class="ml-1 mr-2">and</div>
        <a class="text-blue-500 cursor-pointer" href="https://developer.mozilla.org/en-US/docs/Web/API/Navigation_timing_API">Navigation Timing API</a>
      </div>
    </div>
  </div>
</div>

<script>
  import logoImage from '../../assets/oracle-desktop-logo.gif'
  import HeartIcon from '../icons/Heart.svelte'

  let timeElapsed = '-'

  async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  async function calculate() {
    while (true) {
      const timingData = window.performance.timing
      if (timingData.loadEventEnd > 0) {
        const seconds = (timingData.loadEventEnd - timingData.navigationStart) / 1000
        timeElapsed = seconds + ''
        break
      }
      console.log('Polling load event')
      await sleep(1000)
    }
  }

  calculate()
</script>
