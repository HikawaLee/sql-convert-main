<template>
  <div>
<!--    <label for="HeadlineAct" class="block text-sm font-medium text-gray-900"> Headliner </label>-->

<!--    <div class="relative mt-1.5">-->
      <input
          type="text"
          list="HeadlineActArtist"
          id="HeadlineAct"
          class="w-full rounded-lg border-gray-300 pe-10 text-gray-700 sm:text-sm [&::-webkit-calendar-picker-indicator]:opacity-0"
          placeholder="Please select"
      />
<!--    </div>-->

    <datalist name="HeadlineAct" id="HeadlineActArtist">
      <option value="JM">John Mayer</option>
      <option value="SRV">Stevie Ray Vaughn</option>
      <option value="JH">Jimi Hendrix</option>
      <option value="BBK">B.B King</option>
      <option value="AK">Albert King</option>
      <option value="BG">Buddy Guy</option>
      <option value="EC">Eric Clapton</option>
    </datalist>
  </div>
</template>