/* eslint-disable */
import asyncLoader from '../../phet-core/js/asyncLoader.js';
const image = new Image();
const unlock = asyncLoader.createLock(image);
image.onload = unlock;
image.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEsAAAB9CAYAAADqbZ5aAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAACOlJREFUeNrsnWtsFFUUx2+XFpZipT5KCVq3PAKhpHQ/+Eo13aIJElS6iiGKsV0UEpVIWwQSSSoLviIGoYoGo5Eq8fGFUOIXNFGBWNP4QVvAJhoQGpAUSiJSA1VC1ntm505mJzs7rzv3ntnuTYbZZdtl+O3/njmve7colUoRkWN8eGI1PVVneenif6NX+gjiUSQSFgXVSE/fI2PQDx+Uxc/A622iYR2kp9ismRXkutKSjNeGzo+QoXMjmIW1QBgsCipBT7tLJ44jfT9GyM1TLqIg0N1dZfraxi1/sA+wn5qIaLHA60rCH8senUNBDaGRSzx+OvvFbpmmV3pCmM3CqiqzMXC0kix85Hdy+co1eNpOVbUDHoTEqwo3KEVGqy8wUIcYKCGwVFVFQFUb142iB7V2w1Ry/MQwnXPkEpt+wmAVFZEtcH7xhXnoVXX40C2k67OB9JMUaaWqOiXMz6Kqgum3aWplGRn4uQS9qu5sGJdWFSH7Kai48fWQj6DKqZTb4fGqlunoQa16vsJ0+omYhm1UyteDqtpbz6AGBb7W3v2/senXQlV1URisIKnqwvlyxflUxycUVLfQ2DBItuqJ5hvI19+egIeD9IiaqcoXZYGq6B1wLTx+/eUZqEHt7qpioBT3KhcoX5RFYXXRU0u0dhr57sAo6ukXrR9kzmcnBdVm9TshzqCqARQ8XvNsBWpVrXjuGgPVbweUH9NQCWtAVWYBKoaxvfNW0tM7mBEkC4UVFFVBkLzt3V/Z081OsrPcbFZQbNV9i8Kk7+hZFiQ3OvndEG9V7XxrMlpQkKNSQOXw0kVMQ1AVeeD+maSm9hzaIPmdD44xL32TMUgWMg31RYgfDsxFC0sXJDuefjyVlcSuKkOOKu72fUIcVBWDxx3rx6MNknU5qhYrL923achKW6CqLz79C6WX3rBomBUesuaohMBitgpzEQJyVJB6obHqafrfnO9FVV6noXIHxFqE0OeoKKhmr6BcKwt7actNkOynspKYVaULkgfZtfIYxS5Vhba0BTmqnt5+9hRqflF6zY7egyrxIBdYBGkZno09Xw5nJBhc3ryy3jmL3agK0sVvb8UHCkZD/Y2ufu+fy1eZhw+jz5OBV4sQg1Cx6dgwH33FxukNYfFjIwyW0jHjFRZMv8AUTJ0MrWgB4VCK1JkF2SEHqgpMwdTJgKypVrRIkaZc2QhbyspXVUHaZvkzA8zNgKxp0pOfla+qAju1rmNI31pk6Y9ZKoupCnu62KOditgJh0IWoKoBFDzGXtryaKdshSFW01CRJvbSllM7ZajuHPQcSKuqOgmPwbBPnVLm+gInTSohbyZLpWdSDf6U4/RyLljwRtwa/BNP1kj3+h9eWpYurjqwU7bCHZAnBbbA4/VBfNUKQffKp1JSQUEZrKdXq+7E3OS3fGuTVLtpjtC3r5KtKrBT8eVH2dN2fQcyFlgoHFmeeXi/Ov+qWY/W+jVye7QgEQigIA9PXFShfYcFJoIKtgxcjhUJeS5H2k6lu2Xo9Szxmof3o5lNu4t2f15LGmJ/BtpO+Q0LnDyptUTe9UJfYGGp+mj+lI2mWik2S3UVlKUnMqs+0NcAoOi1gKzivEBxVRYGVwEKq0+v1io7KyioLp7vzwWW6iqAA1q27bU6KXdAQ2EVmv8TvP8NXrBgVUKTzJyXrv0RpNXIc/pxs1mqq9Ck+DUv3STNTgEo1U4l/ADFy8Ar/gu4CjJ8Kn3/FZ0ka/zcG8Jrf5ZUV0GEneKiLLWQ0SnTVVjWPKqtkiCwZM/n4aWZTaqrwBrV1EReTMTWLCGXoKqJWsiQkVWAThndYspWUXvYuG1mk+YqGPZc4Nao5gss2VkFXT+7aQMHpmmouApLm+YIB2VY9B0XPf1DDlUFt+Y6cBXeSF6Vaada3CwnEQZL7yqsbJ4r1FUAO9Xx6jH2tDPXom8UNkumqyDTTjlWlt5VEL1IHBo4ZNopN9NQMeqiex4MDRxS7JSjaShriZzTRjMssMA7rgNX4cP3h4UFyF4aOPwaxRag2mS4Cjt3lVJQ2pYnMXodXjKU3LIRIQtXYbMMVyFy2zgCHxCnUe77NKSwwKi3Bq3pFm4K0KymS900+loKU12FVhmugldQr2w9oiUDCedcfFZlsapykJpuGSjedionrKCsphcNymwadrGsQgFUDmWprsL2oGy+KhJUhp+luQop5iqcRQ0qnYMXBypDWcxVgB21fzp8DTUo3dZzMLj0XtmGpe95//i9OtQLBAyguDd/2IGluAr33B0hX+0dKYAyg1UyIay5CrBCdXqkiNub31s/wu0mIRsUg6Woyo83h7vqmeOT8wIUuxv6kc+G1O/k2bMq6cl9BACpGmjN7umVDypnIO128LpZZOS00iX6JicruIICCz55T3v/ZQEVw/A1M7y7lbWbhdtqNVZQfsBSbhZue+Axg+IKy2u2Ajsos6yD26GEHLBczikoqORgB8VNWV7aJQ0lL0gDJ7B+ZxivLylKwh9Odz7KAqrRr05jFMrS90AcPlBhW1VBA+XZZhl3E8lnUJ6V5aazJqigPCnLzdJeaEgLKihPynIa1hjy5fuJj8tGUCnL6Ub5WQoL8aCBcq0s1tptJ7MqugKDCpaTsCafQLmdhooDarWleb6Bcqwsqiro6dwHYc03+2abwoL9FLRd/fMElJtwZwcLa2pqs4c16Xy5BgpFe6NwZdkJlrEUFqTaLP02BGZdgPkOyrayrMKasQDKlrKstt4cK6CUAcrKdZRMCO+gR2puTVVq5MI07Tg5UJN6aPG8FLymHgmr9wr6YQWqmsHY89FdGaAAHvz9+HD40lgAZQdWFwC54/YZWUGVhMN/03N0LICCI1cffNQYLAehAiPFZkHDCKgH7NJYVxQ7zFq7M4LlKZX/jm1F5VIWU9Xjy+oKitIdxSZhTQzCmgcXhkm0/riSBla/FWnJmFSUmQdPYZ2ipwgk9n7pPxPYfLnvsFgfvOFnCqCMsPTfflIAZR0bthVA2VBWFlUVQOWA1cW89QIoa1ipfMuX+wkLAJWLWgMT1PG/AAMACRIMKRGkTRcAAAAASUVORK5CYII=';
export default image;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJhc3luY0xvYWRlciIsImltYWdlIiwiSW1hZ2UiLCJ1bmxvY2siLCJjcmVhdGVMb2NrIiwib25sb2FkIiwic3JjIl0sInNvdXJjZXMiOlsibGlnaHRuaW5nX3BuZy50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKiBlc2xpbnQtZGlzYWJsZSAqL1xyXG5pbXBvcnQgYXN5bmNMb2FkZXIgZnJvbSAnLi4vLi4vcGhldC1jb3JlL2pzL2FzeW5jTG9hZGVyLmpzJztcclxuXHJcbmNvbnN0IGltYWdlID0gbmV3IEltYWdlKCk7XHJcbmNvbnN0IHVubG9jayA9IGFzeW5jTG9hZGVyLmNyZWF0ZUxvY2soIGltYWdlICk7XHJcbmltYWdlLm9ubG9hZCA9IHVubG9jaztcclxuaW1hZ2Uuc3JjID0gJ2RhdGE6aW1hZ2UvcG5nO2Jhc2U2NCxpVkJPUncwS0dnb0FBQUFOU1VoRVVnQUFBRXNBQUFCOUNBWUFBQURxYlo1YUFBQUFDWEJJV1hNQUFBc1RBQUFMRXdFQW1wd1lBQUFBR1hSRldIUlRiMlowZDJGeVpRQkJaRzlpWlNCSmJXRm5aVkpsWVdSNWNjbGxQQUFBQ09sSlJFRlVlTnJzbld0c0ZGVVV4MitYRnBaaXBUNUtDVnEzUEFLaHBIUS8rRW8xM2FJSkVsUzZpaUdLc1YwVUVwVklXd1FTU1NvTHZpSUdvWW9HbzVFcThmR0ZVT0lYTkZHQldOUDRRVnZBSmhvUUdwQVVTaUpTQTFWQzFudG01MDVtSnpzN3J6djNudG51VFliWlpkdGwrTzMvbmptdmU3Y29sVW9Sa1dOOGVHSTFQVlZuZWVuaWY2TlgrZ2ppVVNRU0ZnWFZTRS9mSTJQUUR4K1V4Yy9BNjIyaVlSMmtwOWlzbVJYa3V0S1NqTmVHem8rUW9YTWptSVcxUUJnc0NpcEJUN3RMSjQ0amZUOUd5TTFUTHFJZzBOMWRaZnJheGkxL3NBK3duNXFJYUxIQTYwckNIOHNlblVOQkRhR1JTengrT3Z2RmJwbW1WM3BDbU0zQ3FpcXpNWEMwa2l4ODVIZHkrY28xZU5wT1ZiVURIb1RFcXdvM0tFVkdxeTh3VUljWUtDR3dWRlZGUUZVYjE0MmlCN1YydzFSeS9NUXduWFBrRXB0K3dtQVZGWkV0Y0g3eGhYbm9WWFg0MEMyazY3T0I5Sk1VYWFXcU9pWE16NktxZ3VtM2FXcGxHUm40dVFTOXF1NXNHSmRXRlNIN0thaTQ4ZldRajZES3FaVGI0ZkdxbHVub1FhMTZ2c0owK29tWWhtMVV5dGVEcXRwYno2QUdCYjdXM3YyL3NlblhRbFYxVVJpc0lLbnF3dmx5eGZsVXh5Y1VWTGZRMkRCSXR1cUo1aHZJMTkrZWdJZUQ5SWlhcWNvWFpZR3E2QjF3TFR4Ky9lVVpxRUh0N3FwaW9CVDNLaGNvWDVSRllYWFJVMHUwZGhyNTdzQW82dWtYclI5a3ptY25CZFZtOVRzaHpxQ3FBUlE4WHZOc0JXcFZyWGp1R2dQVmJ3ZVVIOU5RQ1d0QVZXWUJLb2F4dmZOVzB0TTdtQkVrQzRVVkZGVkJrTHp0M1YvWjA4MU9zclBjYkZaUWJOVjlpOEtrNytoWkZpUTNPdm5kRUc5VjdYeHJNbHBRa0tOU1FPWHcwa1ZNUTFBVmVlRCttYVNtOWh6YUlQbWRENDR4TDMyVE1VZ1dNZzMxUllnZkRzeEZDMHNYSkR1ZWZqeVZsY1N1S2tPT0t1NzJmVUljVkJXRHh4M3J4Nk1Oa25VNXFoWXJMOTIzYWNoS1c2Q3FMejc5QzZXWDNyQm9tQlVlc3Vhb2hNQml0Z3B6RVFKeVZKQjZvYkhxYWZyZm5POUZWVjZub1hJSHhGcUUwT2VvS0tobXI2QmNLd3Q3YWN0TmtPeW5zcEtZVmFVTGtnZlp0ZklZeFM1VmhiYTBCVG1xbnQ1KzloUnFmbEY2elk3ZWd5cnhJQmRZQkdrWm5vMDlYdzVuSkJoYzNyeXkzam1MM2FnSzBzVnZiOFVIQ2taRC9ZMnVmdStmeTFlWmh3K2p6NU9CVjRzUWcxQ3g2ZGd3SDMzRnh1a05ZZkZqSXd5VzBqSGpGUlpNdjhBVVRKME1yV2dCNFZDSzFKa0YyU0VIcWdwTXdkVEpnS3lwVnJSSWthWmMyUWhieXNwWFZVSGFadmt6QTh6TmdLeHAwcE9mbGErcUFqdTFybU5JMzFwazZZOVpLb3VwQ251NjJLT2RpdGdKaDBJV29Lb0JGRHpHWHRyeWFLZHNoU0ZXMDFDUkp2YlNsbE03WmFqdUhQUWNTS3VxT2dtUHdiQlBuVkxtK2dJblRTb2hieVpMcFdkU0RmNlU0L1J5TGxqd1J0d2EvQk5QMWtqMytoOWVXcFl1cmpxd1U3YkNIWkFuQmJiQTQvVkJmTlVLUWZmS3AxSlNRVUVacktkWHErN0UzT1MzZkd1VFZMdHBqdEMzcjVLdEtyQlQ4ZVZIMmROMmZRY3lGbGdvSEZtZWVYaS9PditxV1kvVytqVnllN1FnRVFpZ0lBOVBYRlNoZlljRkpvSUt0Z3hjamhVSmVTNUgyazZsdTJYbzlTenhtb2YzbzVsTnU0dDJmMTVMR21KL0J0cE8rUTBMbkR5cHRVVGU5VUpmWUdHcCttaitsSTJtV2lrMlMzVVZsS1VuTXFzKzBOY0FvT2kxZ0t6aXZFQnhWUllHVndFS3EwK3YxaW83S3lpb0xwN3Z6d1dXNmlxQUExcTI3YlU2S1hkQVEyRVZtdjhUdlA4TlhyQmdWVUtUekp5WHJ2MFJwTlhJYy9weHMxbXFxOUNrK0RVdjNTVE5UZ0VvMVU0bC9BREZ5OEFyL2d1NENqSjhLbjMvRlowa2EvemNHOEpyZjVaVVYwR0VuZUtpTExXUTBTblRWVmpXUEtxdGtpQ3daTS9uNGFXWlRhcXJ3QnJWMUVSZVRNVFdMQ0dYb0txSldzaVFrVldBVGhuZFlzcFdVWHZZdUcxbWsrWXFHUFpjNE5hbzVnc3MyVmtGWFQrN2FRTUhwbW1vdUFwTG0rWUlCMlZZOUIwWFBmMUREbFVGdCtZNmNCWGVTRjZWYWFkYTNDd25FUVpMN3lxc2JKNHIxRlVBTzlYeDZqSDJ0RFBYb204VU5rdW1xeURUVGpsV2x0NVZFTDFJSEJvNFpOb3BOOU5RTWVxaWV4NE1EUnhTN0pTamFTaHJpWnpUUmpNc3NNQTdyZ05YNGNQM2g0VUZ5RjRhT1B3YXhSYWcybVM0Q2p0M2xWSlEycFluTVhvZFhqS1UzTElSSVF0WFliTU1WeUZ5MnpnQ0h4Q25VZTc3TktTd3dLaTNCcTNwRm00SzBLeW1TOTAwK2xvS1UxMkZWaG11Z2xkUXIydzlvaVVEQ2VkY2ZGWmxzYXB5a0pwdUdTamVkaW9ucktDc3BoY055bXdhZHJHc1FnRlVEbVdwcnNMMm9HeStLaEpVaHArbHVRb3A1aXFjUlEwcW5ZTVhCeXBEV2N4VmdCMjFmenA4RFRVbzNkWnpNTGowWHRtR3BlOTUvL2k5T3RRTEJBeWd1RGQvMklHbHVBcjMzQjBoWCswZEtZQXlnMVV5SWF5NUNyQkNkWHFraU51YjMxcy93dTBtSVJzVWc2V295bzgzaDd2cW1lT1Q4d0lVdXh2NmtjK0cxTy9rMmJNcTZjbDlCQUNwR21qTjd1bVZEeXBuSU8xMjhMcFpaT1MwMGlYNkppY3J1SUlDQ3o1NVQzdi9aUUVWdy9BMU03eTdsYldiaGR0cU5WWlFmc0JTYmhadWUrQXhnK0lLeTJ1MkFqc29zNnlEMjZHRUhMQmN6aWtvcU9SZ0I4Vk5XVjdhSlEwbEwwZ0RKN0IrWnhpdkx5bEt3aDlPZHo3S0FxclJyMDVqRk1yUzkwQWNQbEJoVzFWQkErWFpaaGwzRThsblVKNlY1YWF6SnFpZ1BDbkx6ZEplYUVnTEtpaFB5bklhMWhqeTVmdUpqOHRHVUNuTDZVYjVXUW9MOGFDQmNxMHMxdHB0SjdNcXVnS0RDcGFUc0NhZlFMbWRob29EYXJXbGViNkJjcXdzcWlybzZkd0hZYzAzKzJhYndvTDlGTFJkL2ZNRWxKdHdad2NMYTJwcXM0YzE2WHk1QmdwRmU2TndaZGtKbHJFVUZxVGFMUDAyQkdaZGdQa095cmF5ck1LYXNRREtscktzdHQ0Y0s2Q1VBY3JLZFpSTUNPK2dSMnB1VFZWcTVNSTA3VGc1VUpONmFQRzhGTHltSGdtcjl3cjZZUVdxbXNIWTg5RmRHYUFBSHZ6OStIRDQwbGdBWlFkV0Z3QzU0L1laV1VHVmhNTi8wM04wTElDQ0kxY2ZmTlFZTEFlaEFpUEZaa0hEQ0tnSDdOSllWeFE3ekZxN000TGxLWlgvam0xRjVWSVdVOVhqeStvS2l0SWR4U1poVFF6Q21nY1hoa20wL3JpU0JsYS9GV25KbUZTVW1RZFBZWjJpcHdnazluN3BQeFBZZkxudnNGZ2Z2T0ZuQ3FDTXNQVGZmbElBWlIwYnRoVkEyVkJXRmxVVlFPV0ExY1c4OVFJb2ExaXBmTXVYK3drTEFKV0xXZ01UMVBHL0FBTUFDUklNS1JHa1RSY0FBQUFBU1VWT1JLNUNZSUk9JztcclxuZXhwb3J0IGRlZmF1bHQgaW1hZ2U7Il0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBLE9BQU9BLFdBQVcsTUFBTSxtQ0FBbUM7QUFFM0QsTUFBTUMsS0FBSyxHQUFHLElBQUlDLEtBQUssQ0FBQyxDQUFDO0FBQ3pCLE1BQU1DLE1BQU0sR0FBR0gsV0FBVyxDQUFDSSxVQUFVLENBQUVILEtBQU0sQ0FBQztBQUM5Q0EsS0FBSyxDQUFDSSxNQUFNLEdBQUdGLE1BQU07QUFDckJGLEtBQUssQ0FBQ0ssR0FBRyxHQUFHLG9wR0FBb3BHO0FBQ2hxRyxlQUFlTCxLQUFLIn0=