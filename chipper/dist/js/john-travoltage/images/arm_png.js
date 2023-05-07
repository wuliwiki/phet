/* eslint-disable */
import asyncLoader from '../../phet-core/js/asyncLoader.js';
const image = new Image();
const unlock = asyncLoader.createLock(image);
image.onload = unlock;
image.src = 'data:image/png;base64,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';
export default image;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJhc3luY0xvYWRlciIsImltYWdlIiwiSW1hZ2UiLCJ1bmxvY2siLCJjcmVhdGVMb2NrIiwib25sb2FkIiwic3JjIl0sInNvdXJjZXMiOlsiYXJtX3BuZy50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKiBlc2xpbnQtZGlzYWJsZSAqL1xyXG5pbXBvcnQgYXN5bmNMb2FkZXIgZnJvbSAnLi4vLi4vcGhldC1jb3JlL2pzL2FzeW5jTG9hZGVyLmpzJztcclxuXHJcbmNvbnN0IGltYWdlID0gbmV3IEltYWdlKCk7XHJcbmNvbnN0IHVubG9jayA9IGFzeW5jTG9hZGVyLmNyZWF0ZUxvY2soIGltYWdlICk7XHJcbmltYWdlLm9ubG9hZCA9IHVubG9jaztcclxuaW1hZ2Uuc3JjID0gJ2RhdGE6aW1hZ2UvcG5nO2Jhc2U2NCxpVkJPUncwS0dnb0FBQUFOU1VoRVVnQUFBSEFBQUFCRUNBWUFBQUJaQzdId0FBQUFHWFJGV0hSVGIyWjBkMkZ5WlFCQlpHOWlaU0JKYldGblpWSmxZV1I1Y2NsbFBBQUFETzFKUkVGVWVOcnNuR2xzRmRjVngrZlp4Z3RnWXlEc0FXd1dZOWF5WTVvQ0tsVHBsdlJEaFJUUlJwU0tWS3JhZm1nRFJZSUtsWDRBUkZLbG9GU0tjQlVsaFNvVkg2Z0RVcXNLS2tJQkE0S3dyeVdBemI0NGdBM1lCbXcvOS8rN2VnZU5yR2ZBQWV4NWp6blMxY3diMzFudS9kMy9PZWZlR2ZDODBFSUxMYlRRUWdzdHRBUzBTTmdGejhiV3IxOC9LRGMzZCtIWXNXTi8wcUZEaDlUYTJscnY3dDI3M3Brelo3ejI3ZHQ3K2ZuNXJ0N0Jnd2ZyVlpiY3ZIbHp4ZEtsUyt1ZjlyNXBZZGUzM0pZdlg1NjZjT0hDQnZaTFMwdTdEeG8wYUhaT1RzNHY5RE0vSlNYRjFVbFBUL2U2ZE9uaUNsWlRVK050Mzc3ZCsreXp6NnB1M2JwVlBtREFnR2lvd0Rhd2RldldaUlFWRlgzU3UzZnZmWUwxclVnazhrMk8zN3QzejJ0c2JIVGdIang0NE5YVjFYa05EUTNlMWF0WHZiMTc5M3E3ZCsvMkxseTRjTHU2dXZwdkJRVUZ2eW91TG00TUFiYWliZDI2TlgzWXNHSFRVbE5UUDg3T3p1NE5yR2cwNmdtSWM1VlhybHh4c002ZVBldGdBdS9vMGFNTzZwZGZmdW5jYVBmdTNjdEdqeDY5Y3VqUW9TYzZkKzVjTDlDTjkrL2ZqMlprWkZScUlOUnhubHhybGRUYW9QT2k5ZlgxOTNYdGV2M05TMHRMcTlPOW9yR0JFVjI4ZUhGakNQQUpUZkhzSlhYcU5LbnJvOHpNekd3Nm1rN0ZMWjQvZjk3YnYzOC9zYzI3Y2VPR2QrblNKVUI1aW9NZTdoVEljckhlNU1tVFBibFpCMWJBdkt5c0xLZFNJR24vc0FaR2xmYjVmVVRIYTdWOW9Qb1ZPbDZ0UjhCZDN4YlUrNXlqKzlZZE9IQ2cvczZkTy84TFkrQWpiUFBtemFtalJvMGFLQkEvbElLV1N3VVBvVnk3ZHMxVEp4TFRIRGgxcG5PZEF1d3B2bmx6NTg3MSt2WHI1MXdxaGhKdEMzenF4bUpsaHE0M2dXdHliZHd5a0NoQXhnQmJWVlhsbE0welNMV2NkMS83Znd3Qk5tUGJ0bTNMS2l3c2ZGUGczbEtuanFMVHpHMmVPSEhDTzNueXBQZjU1NTk3aHc4ZmRtNjBhOWV1RGh4YnhVZXZzckxTNjlpeG8wdGkyclZyNTg0MWVBYVRmVXR3bE5nNHFLZ1VoWEkvdVZOM1B3QUNqeTNuM3I1OW05TXlwT2JmaFFEam1GeGl0NzU5KzM1SDhCYXB3L3FyRXlPb2d3NG4zdEhaYlAzN2REZ2RxL2pvUU9KR1VSQUZnQll2bVY3Z1JsRlN6RDE3MTY5ZmQ2NlhhM0FlOStKYTNJOHQ5VEZManJnZjUwanRlMEtBVFV5SlNKNDZjS2JLSE1XZlBEcVB6c2RGbWlwUUY1MEpISUJ4bk44Y3B4N3Vic2lRSWM2RlhyNTgyVHQzN3B3cktLMS8vLzd1SFBaSmJOZ0NUMU9NcVBiTDh2THlhaXdKd3YweVFQenFqeW55bHNDVENQM3poUWE0WXNXS3lLWk5tL3BwTkEvbDkrclZxMjhJeEd0eVliT2xtcnlLaWdyWDJTZ0NjR1NUbEMrKytNS0JRUW5xUk9mZVVCS2R5ekhBbkQ1OTJpbVA0OEFsVG5icTFNa0JaTXYxZ0FNbzdpTmxIYjE0OGVLSHV0WkZvUGJwMDhlQlk1OXJvanhjSzlkV3VhWDducENMcm5naEFiNzk5dHM1eDQ4Zi83N21ZclBWT1QxZmtyMysrdXU0dmxxTit1NDYxb2tPQjV6Rkg2WUlkRHFkRFR6TjZkeHZPcGpPTlJWeURtbzVkdXlZaTVPbzlKVlhYbkV1azdxb0U3ZUlJbkdEbkxOdjN6NWk1VjltekppeGRzR0NCVlhoU2t3Y1c3Tm1UV1RQbmoxRE5LSCs4ZHExYTRzVWp3WUlUTDZBUllZUEgrN05tVFBIeFJ5V3ZzZ2s2WGd5VGR3aXNRdmxvUVIrVzlZSldNQmhxTTJmbEZDWVNxQWtYQ25BbUhMZ0Z2a2I4MFlHQitmcmVxZWt4djFqeG95NUV5NmxOV01sSlNYZGR1M2E5WTRVOEEyNXRjNG93ckpEZ0pIOUFVZHh6NmtOSlFFSXhmQWJ0UUFTOWFCQ0E4ajUxQVVNaGZNQkF6emNaVkZSa1hQRGt5Wk5jcTRUMThxMXVBN242amxPYXZ0N25YTlk2bXZ4OGxwcXNnS2JOMjllUkhHaXMwYjdhM0p4SDhxbHZhdjlZZXJzTEp2UG1XS0lZNisrK3FwempYUXdIUXMwbElZS0FZYTdOQVVTdTRBRUxBWUJ4dlZRTFZra29NaEVsWkI0czJiTmNuRkw2bktKRFNvc0xTMTFFS2s3WWNLRURRVUZCWjlvZ0ZXODhJdlpnakJjSGY2enNyS3lxU3RYcmh4am1SdkFiRUx0bjMvWlBtNlQ5VXBVU0QzYzNhRkRoeHdzVzlQRTFYRXRWSWQ2QUVaU3diVUJoK0lZQ0RiM1UxaDE1MjdjdU5HZEEyeU9jMDZ2WHIxY2Zkenl6cDA3NzdLczlsWGJuQlFBNTgrZkg5bXlaY3V2ZCt6WThSNmRaZEJzcnRVVVdweWxNcmVHT1dYS0ZKZDhNRGtudWJDczBsWlpiRDVIWVo4QzhOemNYRS96UnE5bno1N3Vla3prR1F3b2V0dTJiVTZ4Z0FNZ3o5ZWpSdzgzQUlpRHV2Y2REWkM2cjlyMmhIYWhFeWRPVEZPSGpGVnMyNndVL0UyVVFxZjZYYVNWUnhublVZZDNkamJud25YaVJvR0xHVXorRGd3SzRIQ1RMNy84c3RzQ2hqcnNjMDMrVG54RmFjUlNTMzRBUnlLamE5Ym9XZjh1OElmS3k4c2Z2RkFBbFNDa2FRSThTUjJ6VHE1cU1FcG9DYlI0QmdoYmg3VEJZQzltYmUyUytFWm1pUnRFZFFNSERuUy9jWjlBTmdWeUx0Y2d6Z0dMd2NDRW5YMWJ6OVF6bnROQStKT3k0d3RKNDBMZmYvLzlpT1pZNldwVWR6VzRJNlBXUnIyU2dTekZrbzZLVFNsS0JtWktLYi9rK0pPNHljY1ppZ01XNmdFZ01ZeDRScXdpKytRK0RCSUFBZ3RsNFJKUkdmVndtY1JHanJFZXlqV0lvYmhNNW95b0RzQ21kZ0RyV2prNlB3TzNuUlFBeDQwYlY3aGt5WkpaNnFoc2xlRnFjQzlMOWNuNjFFRmRwTEllY2tOcHFNMWkzTk9Bcy9OdHlxQm44S1pQbis3YzNxbFRwOXk5YlFJT0ZPQXhyN1BsTmNEYXVpZEs1YmV0WFFLWmQ0TGR1blZ6OFpWcmtJWFNGZ2FJMnRoVjEybi9OTS9lS2dDVlpMU2pjZmJHbWdZeUlvOGNPWktuVVY4Z2hYWFIzL3FvY2FOVi9RMmJJNUc1bVR0amF5N1NVdmVuQmRjVUl0a29HZWkwYWRQY2Ixdjl4L1doUElDd1JaVUFaMnVMMVR3emJhSjl0aXJEK1hpUXdZTUh1MzJtS0V4SERMQUdScW9BdGx1MmJGbGswYUpGalcwR3NMaTRPS0lSMjBrUE9PN0FnUU1UbFgxbE1HcXRBejc0NEFNVUU3SGtBbGRGQjZteC9WVm5pQnJSUlkzcXJmMU15L0tBRjNzLzlqQmxmeGF1OGxIR1ZLS3dzTkNwQTdkSndSZzhUTVp4bHhTQThYeUFBQ3F3cUVzOURJRE04NEJNQnNvNUtCckk5SUc5RUdaZjdoY0dmRWpUOE13QXFyTytyVTI1eW1VOVZKMXVFcEdiaUFoUWpiL2VxbFdyMHFTaUFRSTRXZjUrak00YnErMGtOU0FkQ1BidWkzMWJMN1NYbVd4cHRLbUt4dEFwbE9jTjZsRnVsRzlYaUdGMHVpMTFNWGpZeDFBWUUzUGFRMzBEakJFTHFVOEJHSUJ4bThSQ2dITGNCckhxWHRBOTlta0FYTlM5RzUrMUMvMVFoWXZlVUlmV3l2Mmw0eXBHamh4NWZ1clVxZjhhUDM3OHRlUEhqMDhzS1NtWklvQ2RCYVN2R3BGTEkwMUJEOU5jSHhDTFdmNUpkVnZBZWhSRTRoN2JFU05HdU1RRWJ3RW8zQ0FnVVJGdWtPUDhCb2E5TmJEdlkzREZaV1ZsVHFtNDFaaVZxdDM3VlU2cm44b0U3cEttRDVjVkh5dSt5aExhdzJlT296NW1vMWVzUTAxQnNhRGN3STMxKzU0YTBFc1BuUTBnNnZwQk5kYzVpV0MwRlhkSjRrRkd5c0RsR01rTDB3eXlURnZBTnJjZSswN0Z3VEtJT3JaYlNsNWZVVkZ4V3ZXcTFHOFZLcFU2ZGtjRG8xckpXdjB6R1hSeEFMNmp6Vy85SFc2ZkEvamZKQ2Nxb01lWnRaUDJBSTBNMDk0SnN0S0Mrd1JRekExNnR2SWpWVlZwVUo5Vll2TWY3ZTlXT1MzVjRpYUI5ZUM1ZVkwNEFNL3E0ZlBqTlN5WlFEME9vaCttTFZhVGRUS0FOWUh2TDQ5elMyRHJwTkE2dWNyb2hnMGJHdHZpV1NOTjRQRVpWSFhrUmFEVVFwZzJDWmNDRzZUQXdNeWZtejdJVzE3NHJXamMwR0RUR3NXMlFQVlBVNEJ2dE1WRFdPZjRFd2x6WFVHREtVV21CQm5ndU5iMm52YVZzdDlZb2dydHlTekYxNUZmWjZZUUJIaEJWSjlQaGJWQlZlRFBXL1BHZ1BNdmo3RUlFSHRIRnZTa0pyQUF2OXRhN3BPNWxIODFKbEhnV1lnT0hFQXBvWjgyTDdVRlBGWXg3S1BZQkpsV1hBMmlBbWUyQlR3V3RWRmVRaVVOS1NuM2dwakUvS2kxNGRrQ2NLSlpabWJtN2tBcE1MYjY4clhuR2YrYXdzTmwyb0p3SWxsc1lmL2ZRVlBnYU84NXZwbFBGbmcrejFFZHRCZzRxTFhnQlgyTzl6ajF5ZjRnZ0Z1RHBzRHZoZkFlRHk4bkoyZWw0QzBKMnJPaHdDRlBVcEczeTd4T2VlTEprcVlGWkpuMlFWS2lUQk9hTTdYbHowRjhyb2lTbUJvbE1Gbk5WV0NobVE5MzdFdXc1b3pKT0xBbzltbEZzcGphZmxNZXBHc1FudzBGTmo0aVpYWWxudG5uZnFhd1JEWjc1eWU3cTlLeDZkY0krcjA2c1BQU2VBRHRjd0UvUEJSbGN6ZjdSNDk4VHBDbzhPd3pFWlZ5L2Z5TlNyN2FsNjN0VDFsdDhVR2wzY1ZCYlVkRWtNanBIMlliOXRtY2ZRcUlPMHgwaGNWUkd0QStWZm1yNEJ5TVYxZWhaWTQyNzBwOVVRM1VIb0VGcUFkdE5KZGhINnphUDYxS0ZvdUJleXkwWmtDT2JrbjlOZ1dZYkJhTFg5dTFmVThRUGszR05xWWxJelRaYllFcjBYYUozRis1bDhTV2xrVFF6RTJ1VXZsWTRDcTlGOERTa2dEYU9aV1Nsc2EyRUdBQ0ppUWh3TFpWMm5tVmY0VFFFZ0NnRDlwV2xmK2l0aEJhZ0FINmdCMk1RZHNRdE5jMlFRWkk3MFhhQUpZZkdDcmJLbWlWSVpJV0FsU0hudkZpTDNXZng0UytTUXpib25JSWNLSENubzA1WWl3WFJhTlIvbUhMR3lrcEtROC9MMndPYUJNVm1WMVM0Zi83NGg4dTdsQ3A4c1d4ZzZHNm5pUEFKcFluY0tzRThnZXBxYW44ZC9pNXNlTUFLQmU4UXpyMmFleDNDQ2EwMEVJTExiVFFRbXNUKzc4QUF3QkpMZWVNYnR0emh3QUFBQUJKUlU1RXJrSmdnZz09JztcclxuZXhwb3J0IGRlZmF1bHQgaW1hZ2U7Il0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBLE9BQU9BLFdBQVcsTUFBTSxtQ0FBbUM7QUFFM0QsTUFBTUMsS0FBSyxHQUFHLElBQUlDLEtBQUssQ0FBQyxDQUFDO0FBQ3pCLE1BQU1DLE1BQU0sR0FBR0gsV0FBVyxDQUFDSSxVQUFVLENBQUVILEtBQU0sQ0FBQztBQUM5Q0EsS0FBSyxDQUFDSSxNQUFNLEdBQUdGLE1BQU07QUFDckJGLEtBQUssQ0FBQ0ssR0FBRyxHQUFHLG85SUFBbzlJO0FBQ2grSSxlQUFlTCxLQUFLIn0=