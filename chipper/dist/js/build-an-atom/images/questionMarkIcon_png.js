/* eslint-disable */
import asyncLoader from '../../phet-core/js/asyncLoader.js';
const image = new Image();
const unlock = asyncLoader.createLock(image);
image.onload = unlock;
image.src = 'data:image/png;base64,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';
export default image;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJhc3luY0xvYWRlciIsImltYWdlIiwiSW1hZ2UiLCJ1bmxvY2siLCJjcmVhdGVMb2NrIiwib25sb2FkIiwic3JjIl0sInNvdXJjZXMiOlsicXVlc3Rpb25NYXJrSWNvbl9wbmcudHMiXSwic291cmNlc0NvbnRlbnQiOlsiLyogZXNsaW50LWRpc2FibGUgKi9cclxuaW1wb3J0IGFzeW5jTG9hZGVyIGZyb20gJy4uLy4uL3BoZXQtY29yZS9qcy9hc3luY0xvYWRlci5qcyc7XHJcblxyXG5jb25zdCBpbWFnZSA9IG5ldyBJbWFnZSgpO1xyXG5jb25zdCB1bmxvY2sgPSBhc3luY0xvYWRlci5jcmVhdGVMb2NrKCBpbWFnZSApO1xyXG5pbWFnZS5vbmxvYWQgPSB1bmxvY2s7XHJcbmltYWdlLnNyYyA9ICdkYXRhOmltYWdlL3BuZztiYXNlNjQsaVZCT1J3MEtHZ29BQUFBTlNVaEVVZ0FBQU1nQUFBRElDQUlBQUFBaU9qbkpBQUFBQ1hCSVdYTUFBQXNUQUFBTEV3RUFtcHdZQUFBQUdYUkZXSFJUYjJaMGQyRnlaUUJCWkc5aVpTQkpiV0ZuWlZKbFlXUjVjY2xsUEFBQUJ1eEpSRUZVZU5yc25lMVJJazBRZ1BHdCt3OUdzQmpCU2dTUXdaSUJhd1JnQkpnQkdBRmNCR2dFWUFSaUJFQUVZZ1JlbDl4WnZsY2V5c3pzYnZmczgveXlMQmYzNDJHNjUyTjdHZzBBQUlCYWMvYiswK3ZySzdjRGZIMDYrMjNVZjl3TEtBTEVBc1FDeEFMRUFrQXNRQ3hBTEFERUFzUUN4QUpBTEVBc1FDd0F4QUxFQXNRQ1FLenEyRzYzM0lUai9PQVcvTVYrdjErL0lUK3NWaXY1amZ6ODh2SnkvS2drU2RydGRxdlZ1cnk4YkwvUjYvWHFmQnRaOC82N0JWcjlZYmZiaGZyWU5FM0ZzOTRib2xvdGZQcXo1cjNXWWtsVE5KL1BSYWFucDZlaS81ZElKbnJsZVM2cTFVR3N4a2V4YXNMejgvTnNOcE1uWGNtdGwvOHIvMTNPSWNwNys4a0YxMFNwOFhqY2JEWXIvMmJMT1F5SHc4MW1nMWdvVlFpaVYweXRWNzNFV2l3VzBtdFRtNWVJN3BQSkJMR01OVlJabHBsSWV5WDNlbng4UkN3RExKZExoYkh2T05hYnJ2akZraWRrdE1jdVRhemRyQ3R5c1FhRGdlblJJQW1MUmp1TTBZcGxLS242TXFPM21ITEZLWlpZVmRXd0oyN0ZMSmIxQ0JpQld4R0tGWjlWRnQyS2JYWERkRHE5dnI0dTZMa2VWaWdjbHNSOHVqTGlzRGppTzZ0cjNFaVNSRDVjVG9CSjZGS1JMM1FSejNJNEhKN2FWTWpmVHlhVEl2SzhicmRMS0N3N1lRODdYU09QY0xsYytyc2VQRFNMNkloVkhuSzdWU24xa2MxbUUzYnNJK3pwSWRheFNSdjkwOEJ5a3FIYVZQa2M1WVB5a1lnVjVJR1ZNTXdkY05oV2VVQ01RYXdnczRHU0NaWFdCb3pINHlCdWFSNTlNQytXMk9DL2NrR3NLdm0wWjdOWjNEMUU4Mkw1Zi92THR5cWdXMnF6ZVBOaWVUWlhrbGRWZVBMK2JrbkdobGpxSG94SVdYbmZ5bitVUk9lNkd0dGllUTV0THhZTERWY2hxVko4M1VQRFlubE80RlNWV2dYdmZ5UkpvbGtzZTBWQjV2TzVUeENjVHFkS0xxVFZhdm1jekc2M1c2L1hCaDVZSGRKMjZVdHF1eHlmZ0tnd0dsb1Z5MmNPUjBQT0h2YUtxdTNiUmhVSzcrN3VuSThkalVZS2x6VDFlajNuUnF1RVdpYk8xRWlzUE05MVhwUVk3M3pzb1lJWFlubXgzVzZkaTFkbFdhYTJRbFcvMzNkT0hOWG03NWJFOHZsMnlzUFRmR25PcDdmZjd4R3JTckhVeHNIM1RJdFFXQm5PemI3K1YxampLMWhxU1N6blRwRHlPQ2hJL3VlV1pxbXQzMnhHTEo4MjMwUjc0RmFiTkdBcDNwcUs1ZnpWUEJUS2JnQmloUlhMU3ZvU1dUVmxNMkk1Wis1V0hwaUpGNTBqRk10NXdDYnV1dXBxTVZPNzRiQUh5YUZRd21GWEV2bmx3OFBEbHdlK0dxbEpJU0g3TzVmekYybWFxaHA4ZjYvZFlHWXZuU01OejhHNWQ5cytib0NqdVZoeTNBR1V2WFFVS2VKUXJDYkxNcCtKK2VKYUxMYVYwOUxuZFN1QnBEYURSQ3dWT0EvL3FoMmlReXdWT0ljenRTMFdPVmIxU0xmai9QemM0Y0JtczZsdDJRdzVsaUtjM3p2U1BLbUFXTlhqL0JLWTVsVWJpRlV4TnpjM3ppc1VFQXYrT2NyZzNGeGxXYVo1ZWhHeHFpVFBjK2NLM3NwWEw5SXJySXpSYUhSN2UrdDJyTUwrSUwxQ0xUMUJaNnNhZnE4aTBtSkZ5M3E5N25RNnpvZExjeVhKbWM0RWl4YXJTcXM4eDU5MDFncWd4YXJlS3A4dGQ1SWtVZnRtRGkyV1Zhc2FmdVhCR0c3QXFzOFpEb2RXM2cwaEZKcXh5c1RtY29SQ1kxWTEzcGJXR0hxVEI3RnNXRFdield5OWJvUllCU0tKZHFmVDhiZHFNQmdvcjVaRGpsV3FWVmRYVi82ZjArMTIxZFlxSXNjcW05Rm9GTVNxTkUxVnZZUkRpMVVsRXJaKy92enAvem1hcDI1b3NReGJKUkhRYmtFSHhBckdmci92OS9zQnJUSmRkZUlIUW9TeXF0ZnJCU204SG9GVnRGaFloVmhZaFZoWVZYT3JFQXVyRUV2bHlFSVFxNUlraWN3cWVvVmVWdDNmMy90L1RwcW1wc2VyYUxGQ01wMU9nNHhYeFdyVi8zaUY0cmV1L01oZ01GQzRNV2VvalRDWkt6dzVZVyszMjBGV3dsaFp2WDRTekJVNjB1LzNzWW9jSzN4cTVWQXh1NFpXRVFyTERvS1R5VVQvMi9GQlFpSEREZDlGaFBDMGFqYWJtVnRoVEs5UWUwOVEycW82M0NoQzRXbTQ3VWRTdDd5S1h1RnByRllycktKWEdCNGZMZEkwcmFGVmhNS3YyVzYzRnhjWGJzZGFmQnVDVUZnU1BtOWYyWG9wbmxCb0l3NUthbVdsTWd5aDBFd2NsQ0M0WHE5cnVNazVvYkRZT0pqbmVRMnRJaFNlTU5EZ2RtRGM4emFJVlkxWVdaYlZ2TGxDckM4U0xMZkpRZVY3UmlCV3hUanZEbzlZaUJWZXJHNjNXOXV4SzhRcVVLdzZqMTBoMXJkdzJ3VUpzUkNya0JhTC91QUJSdDcvZld2T3poeU9xdmx0Wk9TOUVKSWs0U1lnMWpIY05rSWlEaUpXSVdJQlloVUNYVUxFQXNRQ3hBSkFyUEJFVnBVUHNiVEE5RE5pQVdLQlFaZ3JoS0ErTVZjSWhFSkFMQURFQXNRQ3hBSkFMRUFzUUN4QUxHNEJJQllnRmlBV0FHSUJZaGxrdFZxZGVlQmNXaEt4QUJBTEVBc1FDd0N4QUxFQXNRQVFDeEFMRUFzQXNRQ3hBTEVBRUFzUUN4QUxBTEVBc2NBNlZQU0RvRDVSMFE4SWhZQllBSWdGaUFXSUJZQllnRmlBV0lCWTNBSkFMRUFzUUN3QXhBTEVBc1FDUUN4QUxFQXNBTVFDeEFMRUFrQXNRQ3hBTEFERUFnQUFBRkRLTHdFR0FMY3FVUjcwSWwzV0FBQUFBRWxGVGtTdVFtQ0MnO1xyXG5leHBvcnQgZGVmYXVsdCBpbWFnZTsiXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0EsT0FBT0EsV0FBVyxNQUFNLG1DQUFtQztBQUUzRCxNQUFNQyxLQUFLLEdBQUcsSUFBSUMsS0FBSyxDQUFDLENBQUM7QUFDekIsTUFBTUMsTUFBTSxHQUFHSCxXQUFXLENBQUNJLFVBQVUsQ0FBRUgsS0FBTSxDQUFDO0FBQzlDQSxLQUFLLENBQUNJLE1BQU0sR0FBR0YsTUFBTTtBQUNyQkYsS0FBSyxDQUFDSyxHQUFHLEdBQUcsNCtFQUE0K0U7QUFDeC9FLGVBQWVMLEtBQUsifQ==