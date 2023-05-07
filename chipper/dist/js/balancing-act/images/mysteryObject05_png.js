/* eslint-disable */
import asyncLoader from '../../phet-core/js/asyncLoader.js';
const image = new Image();
const unlock = asyncLoader.createLock(image);
image.onload = unlock;
image.src = 'data:image/png;base64,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';
export default image;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJhc3luY0xvYWRlciIsImltYWdlIiwiSW1hZ2UiLCJ1bmxvY2siLCJjcmVhdGVMb2NrIiwib25sb2FkIiwic3JjIl0sInNvdXJjZXMiOlsibXlzdGVyeU9iamVjdDA1X3BuZy50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKiBlc2xpbnQtZGlzYWJsZSAqL1xyXG5pbXBvcnQgYXN5bmNMb2FkZXIgZnJvbSAnLi4vLi4vcGhldC1jb3JlL2pzL2FzeW5jTG9hZGVyLmpzJztcclxuXHJcbmNvbnN0IGltYWdlID0gbmV3IEltYWdlKCk7XHJcbmNvbnN0IHVubG9jayA9IGFzeW5jTG9hZGVyLmNyZWF0ZUxvY2soIGltYWdlICk7XHJcbmltYWdlLm9ubG9hZCA9IHVubG9jaztcclxuaW1hZ2Uuc3JjID0gJ2RhdGE6aW1hZ2UvcG5nO2Jhc2U2NCxpVkJPUncwS0dnb0FBQUFOU1VoRVVnQUFBQzhBQUFBd0NBWUFBQUNCcHlQaUFBQUFDWEJJV1hNQUFBazZBQUFKT2dId1pKSktBQUFBR1hSRldIUlRiMlowZDJGeVpRQkJaRzlpWlNCSmJXRm5aVkpsWVdSNWNjbGxQQUFBQ0w1SlJFRlVlTnJzbUh0d0U4Y1p3SGZ2b1R2cDlMUmtXMGFBYlJrb2hFQkNpd05OZUlSMm9DbDJiSXg1RGlGTmFST1l0SFRTMEU1bm1FNm1aVHFaOW8ra0pIUXk0QmtnYWFkQWVLVUdDb1NTRGlXUWxoSW1CS1pKaU1ISWxqRWd5N1prVy9LZGJ1KzJleUlXMXVOa0NaeW16TEF6R2ttM2U5Lyt2bS8zZSt4Q2pESElwVUVJSDE1ZTg5eFVCbkptN1QvQ1V0L09BdzNIeWZzK2NKZXRldDZpbVNiT3NrZWduTVVZS3VHb0drSXNaWlFsTlNJZ1JlN2hlUFBMYis5cmVDT05LUnY4a2llL1AxbVVvMyswOFlWZW8rS3cwREUrcVYvbSswQllhZmZIa1BTcnhxTzd0dDBwZkgzVnlzc3VmMlZGNm5QS0ZRVmhxdzhFUXEzQWJpdnUzTnU0M1pYVXJ5ZXc5b2xsTC9HMCtkK2V6dWtQbVpySFdXQkxJVkN2VzVJK2JIc1JpTWI2UEZiN2lQVUxhbGYrNDA3QXlZcVdPUmlQSnduS0tvSHU4dk5BZHF1QUZSNERidmRLWUxkOHpWbjc1SXBkUThKcnkwaXN2ZDdZUEpaVEpWcDNZci9qTkM1eHo2RXdxS3h3Mm1iTXFxbGVmaXhmK0VWVlQ5ZXhvaVd4cEhCVUNOeXdmNndhelhPQXFKWURSV0hpejBWVUNvd21lK1dROEJ4cjNDNWM4M0xaSnUwdC94UzczWTlETWVhTS81ZGlWbERrckp5N2FPR3FyZm5BeTZxOFFGdEZyZUhTRHVBVHo1MVdJZDdEME5HMHNTYmU3ZFZXU2hkZXM3cVRLcXZJWnZHb3R3bWJMQk1UNEFOTmxFcUFXWEN2V0x6bzJjbTV3cHRZYThXQXhWdWpGMDRmZmE5eHhvRkRPelpES0tlTnBZQkQrOUtISjFaZlI5OG8wSjBzNW0yUkthTUppY2lac1IrckV6aFZSUTI1Z0MrdS90NXZyV2lFUjNQTUcvaXpreHE0OXZ6YjM2b3k2OHdPc204YkNOeDZWb2MycVRmUTd6dFBzeVpGRDBqYm93eGpuSmlEbzlvaHBKNkJBUXRvWTgvNS8zSjR4K3lCUHJ1dHFFNVJUR252aUhKYkw0bU9KNGFNTnBsYXUvQmg4K0ZqKytkRnBVQzloUDUra3pQMFpCeG5NWTR4MTljOXN5eWJySVZWVHgxMXhzWVVFNmZ2Yy9Halp5YXRIbFpueThpWWJuYzUwamI0UDVNNmdJWk1LTk5rMnRJU2E1MGltbXY5aDhudjhVc1dzeHVRSEoxdnMxWlVLS2dzRVJsdXlXRi90TFRtaDJ2aUNVMlZlSWJpeExpajkzZjVWS3hXakRaT211YkhIL1dSUi9PM043N1NrdGhLeEY5c2xuSlBMSmF5bmJrVzBOOGpiY2lhcExUNFBnSlArdlZBQkJqY3VrYWY4L2ZISWlzT0hkdjdmcEtUejE4eWs2TG9UUzduQXcvRnBERWdwcHpvNVdXRFFRdTFxVEs2U3orS2tNUW5zTFRoQ2sweEMzY2YzSDVoOEZZaXNpNFUyS3RISlJtQ1JpRFlkYUQ1cjBmMlZHU0Yxd1RVelYvaEsvUS9Za3V6UHFjQXhkMEZKTHIzcG94RkpDbVJOb1JrbjhEWmpwTlM0WEw5d2xWVEtJcjVwU3oxQys3clU5SnloQllLUS9EYWJySzZiKzFzYkRnOFdIbU9NNjJqYUhhNm1mOW04ZUF0bzRGM2RoL3Njem5IUFBqbW4xNXVHYkk4K0tMV2VKMzhMT0ZwaTVnUWhBMmwyamN2T200RE1RcVFtQjZna3REV0hyNGNzd3V1SzA1MXpBVGNaa3RUdk5WeEtvUXAyQ2lZSFc0U2tldzhaeVhKQ1hvNGc5T0ZGUTlJM2VjODF3bUNvVE5CSkVzTER4M2UvWDZhMHhjVUZJaHo1MzZuUDFlblZWUVZpdjM5TkZHT01qQW1tT1JRS0lvN0FnR1QwKzRaTkY0R05NVVNaK3NIRkVzcmdzVUZZN0VJTkhJT3Nzb2NUSFpVQ1dzeWFKb0JvaGdtVnBWbFNDc1NUVkZKRm81RUlneEZVWDltTlBCZHUzYll3VEMxUmZWUGsxd3hMKzI1d1A0SHJQbHhMVDE5V21YV0NQckZKN0hZMmdLa0R2clhtYlBndFkwYmVRcmN3KzArL0gzNCsvRDNVR08wbUttRm51RnFpa0lLVGpaejMyZVhQaCtXT1Fia3dKcWFCWnRaQS92VVNJOUgwQjRFQXplQk1hVmNVMGtXamlJQWlvdmRlb2tMOVBZR0FjOHp3TjhTQVE1cmZicVZTSnpIOURYZ3NOdmo0M3U2UXNESUdWUG1VWUVDVldDeFdETE9JOFVrRU83dUpBa1B2eXZMOGgvaTVVRlZWYlZ2Lys3WFNnY0d2YjdoRmVRT05NVlZVRWlLYXl1WlNQOTgvZk1aQmZiMFJzSCtkMzZIU3R5Zng4ZHZmOHNMQkw0MkkveXp6ejBHcG41OVhPSzlYUnNQS0NNcEMzM3JLa1ZWNllsMnFxcHVac1o1bXBxdUFyYnJIZlZ2SHlKcTdTOGE1bWgxZmNZOS81T1gxakUzaXNZaWxXTFVmTUR6YVZhTENTeDdvWVp1VmNLS2pCV2NDN2kzSkV6bDVMQ2FBZ2U3ZWZobGdBOVd3RHEraVBiYkpaZ3YrSkRSaG1ZTitNc0NIOXhZa3lGdjhFUkpYRmhZcE02ZTlRUk11eVdJUklCSkVKSnJjakllb1JpZ0tKalpxVVFFRElhMFdnb2dSYnNOVUlsVEp6dXBUSTVNbWt3RGwzeHVVUldWMEtrZ2RacFlESUhULzN4UDd1enNOTVF0Ti9VYk16RFBmamVOaHRlck5RMzZWaFQ0L0t6T3MzckxvVE9lekQydFVwSHVaOWl2SEQ3SFcrNy92L0lnN2pTeUNMWHo0cjNTUkNsS0orQlpsb3FVajQwbVhiSEpDSUdtVHk2Q0J5WlAwUlZ5MVhjSjIyMXFrcU5mdWhRQlRzZTR0TEdSL3B1Z3RLeUlsQWZKQi9OZ01BaUNOOXJCK0FjelgyOXFIS0ZnQ3k1MDNEcnZYbTBMQTVLTWp5Zmd5WG0zODJjL3JUY1BqdVBuRzM2RFhweDBtVG5FdUZEOTJoZjA0am5jc25VVEtodjFRYUwveWhVdlFITDZiWjlBSW1SZDdlM3lJQjdIUDJrQzZwSGZxMjVYR08vRUkrZzFMNjdXUzRqdy9NbHR5dU9UT3VndEJ3V3c5YzFqcjJaMDJBSHdhZkJ5SEtoYS9vRFp0MmtqMHJQKzZoK3NaWHorUjFHK1N6OEFYZ2FERkk5bGVqazhxV3grZFl0dUpuNTQxaXI2eE1WQ1JUZmFwSUluN25HR1dZSEI0SW40bmFNQ3JkY2xuQWF2QjU2dkFoREF2TUh6VWFCNDVBU1lCSytTK2pvYmVENEtJS1Rxdm4rdDFhOExucXNDNU95UnZHMjZ1enJ3VU9DNUtwQzFYWHdYWndQUFZZRWtlS2RWZ1BrdzNLa0N4UVl4NTNseVVlQ095NE83V29GaFV1Q3U2bkZOZ2VmWEJIQWZxV29UcFM5QzFIQXJVQVBQcXZWTFA0V0NZTUpYcjdiQVlZRS94RDZLM3RnY1QyQUpnWXVYcmgvZVVnQ3l5Z0ZjU2U5N2UvV3RwTGl0RVp3OWUrYnV0bzBHbmlYekRodjRUanhMTi9QRzRUdEN2ZmgvQWY1eG54a1BGL2p0YU9NcWhxZFFoWEszNEZxaXkwWlg5TWg4ZUNMbVZZY0RQSEdHcmF1cjJ5dUswdFRPNEUxY2FMZm9ock5ySFNIczhZek0ySzhsdXVibVp0elYxVldxSFN0VCt3T0JOc2didVFESEdjU2VjRGN1THJEcXlNSFkxOTRCdlY0djBKdm42TkVqQ3dqMytmOEtNQUJPKzFqSGpGUnh6QUFBQUFCSlJVNUVya0pnZ2c9PSc7XHJcbmV4cG9ydCBkZWZhdWx0IGltYWdlOyJdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQSxPQUFPQSxXQUFXLE1BQU0sbUNBQW1DO0FBRTNELE1BQU1DLEtBQUssR0FBRyxJQUFJQyxLQUFLLENBQUMsQ0FBQztBQUN6QixNQUFNQyxNQUFNLEdBQUdILFdBQVcsQ0FBQ0ksVUFBVSxDQUFFSCxLQUFNLENBQUM7QUFDOUNBLEtBQUssQ0FBQ0ksTUFBTSxHQUFHRixNQUFNO0FBQ3JCRixLQUFLLENBQUNLLEdBQUcsR0FBRyw0bEdBQTRsRztBQUN4bUcsZUFBZUwsS0FBSyJ9