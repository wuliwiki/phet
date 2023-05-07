/* eslint-disable */
import asyncLoader from '../../phet-core/js/asyncLoader.js';
const image = new Image();
const unlock = asyncLoader.createLock(image);
image.onload = unlock;
image.src = 'data:image/png;base64,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';
export default image;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJhc3luY0xvYWRlciIsImltYWdlIiwiSW1hZ2UiLCJ1bmxvY2siLCJjcmVhdGVMb2NrIiwib25sb2FkIiwic3JjIl0sInNvdXJjZXMiOlsic2thdGVyNl9zZXQzX2hlYWRzaG90X3BuZy50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKiBlc2xpbnQtZGlzYWJsZSAqL1xyXG5pbXBvcnQgYXN5bmNMb2FkZXIgZnJvbSAnLi4vLi4vcGhldC1jb3JlL2pzL2FzeW5jTG9hZGVyLmpzJztcclxuXHJcbmNvbnN0IGltYWdlID0gbmV3IEltYWdlKCk7XHJcbmNvbnN0IHVubG9jayA9IGFzeW5jTG9hZGVyLmNyZWF0ZUxvY2soIGltYWdlICk7XHJcbmltYWdlLm9ubG9hZCA9IHVubG9jaztcclxuaW1hZ2Uuc3JjID0gJ2RhdGE6aW1hZ2UvcG5nO2Jhc2U2NCxpVkJPUncwS0dnb0FBQUFOU1VoRVVnQUFBRVlBQUFCR0NBWUFBQUJ4THVLRUFBQUFDWEJJV1hNQUFBc1NBQUFMRWdIUzNYNzhBQUFNaVVsRVFWUjRuTzFiZlZCVFZ4Yi9CUVJFS2tTSlFrR2JMSmlLRVV3SUlGUFdTRmlsaTRvRlJhMkZhcWhWT3hVVkhNZFd0OTJOYmRYYXNTNnNpaDh0TnBRVzJ5b09WS2wycWkxcHBhMGZsYVNpUWhVaEhVdVJJbjB4Z0FGRTd2NEJpVVR5SUhrdjRPNE12NW5NNEQzM25udnV6M1BPL1hqM2NnZ2hHRUp2T0QxcUEvNVhNVVFNRFlhSW9jRVFNVFFZSW9ZR1E4VFFZSWdZR2d3UlE0TmhqOXFBbnVCd09Gd0Frb2VLdFlRUS9hRGI4cWhXdmh3T1J5S1ZTbE5hVzF2am1wcWFmTWVNR1RNTUFHUXlHWmZMNVpycm5UeDVzcm02dWhyKy92NC8xOWZYSDZxcnE5czdLQVlTUWdidEI0QXJsVXAzZUh0N0crTGk0bHBVS2hXcHFha2h0a0NqMFpEMDlIUXlkdXpZbHJDd3NGd0EzQUcxZGJBSUNRc0x5eFVLaFUyWm1abUVvaWlieUtDRFNxVWl2cjYreHNEQXdEZi9iNGtKQ2dxSzUvUDVqWm1abWF6SWVCZ1VSWkcwdExSV2dVQlFOUkRlTTZDa1NLWFNIU0tScU0zV2NHRUNsVXBGZ29PRGJ3R1FPTkwyQVNQRno4L3ZXRXBLU3R1QU1kSURHbzJHOEhpOEprZVNNMURoczMrd1NERkJvOUdZUE1jaFllVndVdmg4ZnNxMGFkUHVEU2dMTkZDcFZFUW9GSll4dGIzbno2R2tBQkQ0K3ZvYTJjNDZiREJuenB6MnlNaklsYmJZMjlmUG9jUUloY0t5a3BLU2dSMTVQNkFveXBSdldJV1V3L1pLa3laTml2Zng4UW1SeStXT1VvbHpaOC9pdDk5K3M2c05sOHRGV2xyYVkrUEdqZHZNcG0rSGJRbUVRcUh1MUtsVGZJRkF3RmlId1dEQWw4Yy9oeW9uQjUwZDl4QXM0S0hoVGl1cTZ4cXhOaU1EaTFLVzJLUkhyOWRESXBIOHFkUHB2Sm5hNGhCaU9CeU9aTTZjT2VlTGk0dGRtT3I0OS9hdE9GcHdGRE5DQXpFellpSjhSbzAweTFxTWJYaXYrQ3orYk9VZzUrTlA0T25wMmErKzU1OS92cjIwdEhTWlRxZkxaMktQUTBKSkxCYnZXYjU4T1NOU2Zpdzlnemo1Tk9odmFMRjdiU0pTbmc2M0lBVUFQTnpkc0c1aE5HYUhqc2ZzR1RHNGNrbmJyOTRGQ3hhNGVudDdMMlppRStBZ2p3a01ETlRmdUhIRHk1NDJCb01CTzdkc3hxV3k4MWkzU042TEREcFUvMzRiVy9KTzRUMVZMaVpQZWZpRXdoSThIcS9wOXUzYi9idVhGYkQyR0E2SEk1ZkpaSGFSVW5IMUtoWTlFdytQMW5wc2YybXV6YVFBUUlBZkQ2OHZqY1hLRjFMNzlaekF3RUJPOXhtUDNXQk5qRWdrV3AyWW1HaFZwdGZyb2RWYUd2OWo2UmtzWDVLTTlIbVJTSkJOWWRTbm1aeGx5L3FjdFdiTm12VVllaDk4MlFUV3hMUzN0NGZUVGRGYXJSWkZSVVhtZngvTy93aWJOMjNBN3ZUNUNQRGpzZW8zd0krSGRRdGtXTEVrcGM5NmZEN2ZuNGwrUjRTU2Q4OFR0NTdRNlhRd3lUN0wrd0E1ZTNmaDdSV3o0ZUh1eHJaYkFFQklvQjlpUXNaQnVYR0RWYmxjTGdlUHg0dGxvcHZWbVMrSHc1R2twS1M0MHNsMU9oM2tjamtPNTMrRWd3ZjJZZnRMYzNHL3N4TWZIUDhPcDg5ZlJUMTFCK2pPL2E0dXd5QVJQb0czMHhaYTFUWC8xVjFvdnRzR0FCZ3gzQlU4N2tna1RBOUZnaXdVR3c4Y3g0K2xaL0RVTkZtdi9na2hEVXpHeG9vWVBwOC9lY0tFQ2JURWFMVmFpRU9DY1hCL05sNllGWUVWMjFTNFVsT0x0dlo3VnV2UGlxTFBPYlVORk80MEd4OFUvRnFIMHArdllZdnFHRkxpb3ZERzY1dHcrTmdKaXpXT1RxZERXVm5aRnd5R3hvNFlIbzhYSzVIUTU3YmJ0Mi9qM1cxYjRlbldpZVIvN29NVGg0UGhiaTd3SHpNS0FEQml1QnVDQTdwU2dLdnJNS3hkUk8vMXl1V0oySm4vSlp5ZG5IQy9zeE1BMEd4c1JXdDdCL1lXZkkwZ3dUaTh2enNUNjE5VG10dFVWVlcxQTJEMGhZSDE1eE82L0FJQWpmVzNzSGErREJ0MmY0SmxjNmRqcmt5Q1NRSS9SdjNNamhKamRwUzRWN21oeFlpQ2J5NmdVSDBSaFlWRkZzUlVWRlRjSllUMHZ4cTBBbGJFVkZSVUpMVzJ0dExLdVI2dStGdDRFQzUrK0VZdldXMERoZG8vS0V5ZEhNREdCSGg2dUdQWjNPbFlObmM2VXJkK2FDRnJiR3pzWktxWDFhelUyZGs1TEM0dXp1NTJoaFlqNXE3UHhMSXRPVkMrWDJoMysreUNyeEcwYUNNT256NXZVZjZrLzJpbzFXb0FYV3NvRnhlWEpydVZkNE1WTWZmdjMzZG0wdTdic2tyY2JXMUh4LzFPZkhYdXN0M3REeDc3RmtBWFFUM2g2ZUZ1L2x1cjFjTEx5MHZOeEQ3Z0VSSHp3NlVxODk4ZEhmZnRidS9zMUdWMjAxMmpSWG5selQ5Z092YlFhclZvYTJ1em4vVnVzQ0tHdytIUTdrRDFlajBJc1I3aVVWTW1tUDhlTnN4K2JwMmNPQUFBTjFmTERYMno4WjZabUo5Kytxbjk4dVhMcCsxV2J1cURhVU1BY0hGeHNiNGdRZGYvV01URThWWmwwZElndUxwMDVmMm5JNFB0N2pjcEpnTE9UazVZa1JCTlc0Zk5qQVFNNEcwSGlVU0NyVGYvc0NyejlIREh5YXoxakdlbFY1Yk14aXRMWnZjcWI3cjdZSVpzYUdqb3NGdHhEd3dZTVZ3dUY4MUdXb2VDLzVoUjVvV2VMYWh0b0RCeXhIQ0xCTnNUaGhZanZMeTZUaiswV2kxR2p4NzlpMzBXVzRKVktEazVPWFhxZERvMkttekcrU3ZWeUR2eFBhMjhVbGNIZVl3Y0FQdkVDN0FreHMzTjdkNWdFVE1qUW9SelY2cHA1ZWV2VmlNOE1ncEExeDZwc3JMeVV6YjlzVDUyYUc1dXBwWDFqSGsycU5EOWptMjV4WmdrZUp5Mnp0Y1hmMEhNaks2OTFzbVRKNXNCTUU2OEFNc2NNM0xreUxLQ2dvS1krUGg0cTNJdkx5OFlXb3kwZWFFL3BPM0lRNFd1RGxORkFaZzVWWVNaRVpPdDFxdHRvUENYZ0FEenZxMit2cjZkc0x5ZXhvb1laMmZuOXI0OEpsUXFSYVd1cnMrWjU3V2NZa1E4T1I2SjAzdHZFTE0zTExYSmprTDFSY3hmOEN3QTlsc0JFMWlGMHVqUm8yOVZWVlhSeW1jOEhZZlRGNjcwcVlQajdJb3pOUWJNWFBjZnZLNzZDcC8vY0FXMURaVE5OaGhhakNnNjh6T1NubjBPQVB1dGdBbXNwK3UrUEdaZTBrS3NYYk1hcXhmU2gxUENVNU53NG1vanJsNnR4S1h5Y254UlhJeWR4elg0VlZjRFR3OTMrSS8xaHYrWUJ4OGhIdmNjYnVGZGVTZSt4OUlsS2VZdzJyQmhBNjVkdTJaZ095N1d4UGo2K2tLbjA0SHUwMnhHeGpxOCtjRVJ2THRta1ZWNVJOQjRaQmQ5aCtMaVlzVEh4Mk5LU0lpRi9GSjVPZTdjdVFNQWVHN3hZaFJ1WDJXV21ieWwvTDBqNXJLYk4yK2lxYW5wSzViRFloZEtIUjBkRThMRHc4MWJmV3RZLzhwR2NNY0pzV25mVWRvNnU5Yk14OWEzTmlNL3YvZlgxQ2toSVpCTm00YjgvSHlrUGhOanNTajh4NzZqeU1yTU1udExVVkVST2pvNk9nQ1VNaDVVTjFnUjA5TFNNaTR4TWJGUFlnRGdvME9md3NNM2dKWWNUdzkzcUY1Tnh1bGpuMkZXM04rUm41OXY5cEpMNWVWWXZIZ3gycWxiV0pVUVpXNXorc0lWR09HS3BNWEo1cktzckN6NCt2cmVaVHNqQVN3LzBRcUZRdDMxNjlmNUVvbWsxNGMxYThqWnV3czdkN3lEUE9VSzJweFQyMERoMkxsck9OKzltQnM1WWppV3hJWWpJdWpCaHRUUVlzUzhqZGtvUFh2QkhNSnF0UnE1dWJrb0x5L1hYN3g0MGZhOUJnMGNzbGN5RWRQWHdUZ0FMRisxRmh4bkZ5amVlaHQ3MWlkYjNTdjVqeG1GbCtNajhYSjhKSzJlMWU5K2pOM1pleTN5V21wcUt0UnFOWktTa2hpUG95Y2NjdHNoTVRFUnVibTVOdFY5OGFXWGtYM2dJSmErZWREc0ZmWmdZL1lSUlB3MUd2T1NIbngvMnJ4NU0xSlRVeUVRQ0RCMjdGaFhEb2Nqc0Z2eFEzQVlNV3ExR25xOWJhRWRNek1XcFdjdjRKMVB2OEdlSTdhZkpYMzRSU25jZWY3WWMrQ2d1VXluMDZHb3FBZ1pHUmtBZ01qSXlCRUFCUGJZYncwT3UycVdrWkdCckt3c20rc0xCQUpjcnJ3T2JvQUVNOWJzNk5ON0RDMUdiTnAzRkxwbUp4d3ErTnhDbHBxYWlxeXNCek9UUUNDQVZDcWR3MndVUGNEbUFoK2Z6Mi9zZVRHUXorY1RqVVpqOTRYQ21wb2E4bHpTTThUZng1dHNVc1NUUE9WS1VubDRPOGxUcmlTYkZQRkVGUGdFMmJIdHJWN3RsRW9sU1U5UHR5alRhRFJFTEJhWHNoa1hZWHRyVXlxVld0eGJMU2twSVdLeDJHNWlUS0FvaXVUczMwdFd2YWdnVWVFU3N1cEZCY25adjlmcW93eFRYOVprQVFFQitrZEdEQUJCWEZ4Y3k4TkdLWlZLb2xBb0dGSmpHelFhRGVIeitiUlBlaFFLQmVIeitTbmtVUkFqRW9uS0N3c0xyUnFXa0pCQVZDb1ZxOEhUZ2FJb0VoMGQzV2ZJZG5zVHEzQmlHa0k3K25vclFGRVVFWXZGRGllbk8zL1lsTWY4L1B6YUFBaklZQkVqazhuK0ZSSVMwdEdmWVk0bVI2bFUya3dLSVYzdkNzTEN3bkxKWUJBemRlcFUyY1NKRSsvYStsYkE1UFpLcGRLbStuMkJ5Y3M0b1ZESStPcTgzWG1GeVZzQmhVSkJFaElTV0QvNXN4ZHN2TWF1eXFHaG9kOU5uanlaVVhnVUZoWVNQcDlQNkJMMlFJR3AxOWkwOHVWd09GeUpSRklxRW9raUR4MDZCTFZhRFlsRTB1OXhRMDhrSmlaQ3E5VWlOemNYY3JuY3B0MjRJNUNjblB4WWNIRHdjcnNiOXNjY0FLNlBqMC90dzQ4OWEycHFTSFIwZEsrVnB5MG9LU2toMGRIUkpDRWhnUXowTTU2YW1ob2lFb25LaVNORENRQ1h6K2MzOWhVNnB0bUN5WVBRa3BJU29sQW9ISktjNlVCUkZQSDM5NjhqamlMR0ZsSk1NQzNQQjJwUnh4UXFsWXFJeFdJeWF0U29UdGlaWjFpVFlnSkZVU1EyTnBZRUJZY00rdXp6c0IwbUwxWXFsWVNpS0VhejAzOEJueWxQdGVHb01HRUFBQUFBU1VWT1JLNUNZSUk9JztcclxuZXhwb3J0IGRlZmF1bHQgaW1hZ2U7Il0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBLE9BQU9BLFdBQVcsTUFBTSxtQ0FBbUM7QUFFM0QsTUFBTUMsS0FBSyxHQUFHLElBQUlDLEtBQUssQ0FBQyxDQUFDO0FBQ3pCLE1BQU1DLE1BQU0sR0FBR0gsV0FBVyxDQUFDSSxVQUFVLENBQUVILEtBQU0sQ0FBQztBQUM5Q0EsS0FBSyxDQUFDSSxNQUFNLEdBQUdGLE1BQU07QUFDckJGLEtBQUssQ0FBQ0ssR0FBRyxHQUFHLHd6SUFBd3pJO0FBQ3AwSSxlQUFlTCxLQUFLIn0=