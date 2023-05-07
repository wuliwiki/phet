/* eslint-disable */
import asyncLoader from '../../phet-core/js/asyncLoader.js';

const image = new Image();
const unlock = asyncLoader.createLock( image );
image.onload = unlock;
image.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAH0AAAAvCAYAAADOxsXZAAAACXBIWXMAABcSAAAXEgFnn9JSAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAEsBJREFUeNrsXAt4VEWWPp0ECAmsTQTS8koTgptgIh0wmhCMHUUI8jDoLiPjikHxG8T5NoAzOgvOAIOP0RmFzC4KKxKCuvhYTIKjEFdMQEAYHgkSICMQOgPII4w0miARSO/5q+s2t2/f7txOxxmI1kdxu2/uq+o//39OnarbRD+Wq72YueZynce1nOsZWXP9nRDxY5+1SbHKqgbC5ufYCllDvR9AvZurPa7/ABqUMpiSkgdTXHwCbVxfRqtXrcT9S34EPTRAbRLMwXLrAToqugtZ4wd4ndTY0EB1hw8pX6u4FkkQHCEyOp/vZ7spPZMGMcg3pQ8T91eXjes/okD3+RF0X3baJLAA1K4A2r2nhXr0jOXK29hY0dFgmLoA5LVr3qMdWzfTucYGhwR6RQhAK0Y3F4Azm81Zt4+irDtG+j0Y968/dcIh76tbTD9gkAGuXQIswAaIkEdsATS2Whah1J86SXW1BwXIotYeQkerD3FKdts1p1apDMFpBGy+fx5Yfe+kycLoAhU8y4LZj8PgsgO5kB8S0xU/eJtksFnxgwAYW72yv3o31Z88KUDFZwcDzJ0q/obzURSJVVSBjzdv/KTMLo91SFkvkqAbUZyFAHv0+HsIVc/wtAXPtGTRC9jObylmaO9MV0DO5Y6zKiBjq5VmhSn79uyW7HUzGXIeJ1mvSLuegaDTd2zdQgy2uIZkc6m/YMpPmQF2Z90xymyE2ery9JzHcV/cc0pLx5raKdCIanMZJDNYCHnUAwrMBUDKFqAmSYMIxH7tNTZw4CT9eIUqYHMGqUKFfH/7tBm/NHRfdVlS8HtE7FCRbCP3bS+gw3c+CKAZMDMzRQCtZQp8McABUNgCZBiFMtQxyiywGkCvuxw0AeSCVgZsMNJClnHBbiNSri48NEPFfVONGtrVDDrYkQewGTwrwMsZf68XcAB5PzN4H4OMbSODBWm/6ZZMwehg5FPNaoyDVX66JIQ2zGOQ507L/6Uw0mCKYrwcrTslw6uMnns1gp6rsBqMvo2HL2o5VFis+GZFsm+6ZVjQHeuH1W0xDEMpZFXKmzXnt4aND+3asW2L4kqUUUJQgF9NoCuJiblgdQ5HtAAbUqgEUDu2uYHGd+wHwIh89QI2IwUqsW7NagG49NUFIbJa3ZZyfi7br599sUU5h+FCWfAc0aJdw7hNCbRy2ct4rimBxuNX65DNLCPafHViAoAoMqvKegmgs24f2SpGq5kNP4kkB1yBZJSjDZjtAZwVyjZ56qN+AVdiD6gLXBLaAwOBAavG4q0C/IplekSnTrbmS5dyXc3NSDmawVikHB3S6jGccrlc4ljINwzB6Hg2UEH6EgwC2A9MnS5kV8P4UNOp5Xxt+1PPvOhXvjd+4h4J6BkwDBCAM/CL+OvM1rbT9PcGU5XuVOexSZ296hzdnWsPXxY21NO5r08QG4QAJmfcPSGxWh0HrHwVctlIgYZMcmikuBWHTIJskAZQYcSHayUdQEJVZL6c1K7Lz1gcBjchlPaavgdgrTKyBojXSIDFvigGUgEU24gOUfRP3eLEeV3NcdShY5Tvg/GHc9/UU03VO3T0UAUheAs2cRHIb7/OzEYsgGtCLfwVHAe2Pz5nvgBESqwwPs3kCkkDyFYnXViRFj5XsMQDJu4NNwIjUuIPtbHheri+cm1UVgDDY/HvC3SbCtA4k8lkDYuIsJnCwsw9LYMoqksPiuba3ZJEHTpE0zUxcd43NZk8Nzdpn0R+bvz6FH2+/S06/EV5m4KtsAudHhYeTvzclHRDitcx/azxHoDgThA1YwSA/TgP/hXPEy2PwbAQ+7ldJeEREQXKdS42NQGgyucKlopz1GArow8FWHWaV8n+oWCyRw4TU4ON1EMF3azKdtnNMdeZu8VcR9aEIRQZ6W54edkyir8+mzLsj3hd3aS9pfufF9jqY5qaGmlz+at0YN/67wVs1Jju8XTnmJnU9ZpY+o7v97fTh1XPYaJjR6t1O+nokeqWO08lU0fq9rDxRNPseb+j7Z9tEoAraWBlWOmZC0eqN9biM+KQCZiQ/HiwoHsiaEvvgebUtDE87s0iBt3nQOdXx+nlP0ym4bc/QoNuvNP74iZvlus9AHZv2fAGVW4voVsyh38vYPfoGU/Dsx9gxt6o6QkT6QqOyecQlWlo/q7XVv5/+7ZS+mjtf1OnDh2pe4+eAmiRNTSYO4C/X1LwAuKG/n8P0MUEQOrNY8wZWT8hBr3FCzoO7qI3X3uSps8qciuAwc6s2beF/u+DV6h3X4sAO9j8sx7QYBJkGdKYlJxJGcPvJWv8YA2A5ON2dGzB77P7GoNLbLXHlX/8Bq3/6HW6M2cct++BoEca+VP/DcmhVg/TjIAOdhczyPa7cmcICQ+mrFr+JFksVrp95IMtduaZr07QByWLqc6xmybzMCnQAgG9xIU62MFnbJWp0AEDbZR843CWz0zqFmPRAAFgXB53o9shJj0GK+d5uys9pmuvt+K1eayQUfTIY8GrNPw9B49OyfaQArkIPwFaMbPbOpoBj+wc/NjXxi5gXclCGnP3QwE7c+Mn/0sffbiC7HeOpMefeiNgsmK/8H/u6U4l2Okc1YX69HWrz8B/tvFlr6HMWydSzLUWVoyEy4xrEUjtPpN/VgSQc3/tVL707ZdAhw9XtgooOSVsZvWC+s5rS6YjEq/Mzplqzh71cEgS8puZGTT/d+/Qtd0tPp357bkGWrn8WTp+7IDuuFhJrXomSpjJ1yemcqcNFFsBdr8EFWMDdLyeHAfzd5OXB9fVRlOAa6Gtlbs20/ulRfS3+uP09B/+S4wAWptPaAu2R2glPeO2n+gCXvnnD6hq+4csx8cJUbst7S5iNfB74f7sEk6dOES9evfy6Y+d2zbRwb9U0ui7L49N5ThUVHxOHJRKiUlD6OczJwmwWwSOfJTaByhvWfZ10qYWaGFq4QHUu3bu2ES7dm6myp2b2Gi/piFp6XTyWB2tfHUx/Sz/iVYFqEliIWSmmfsoJLarn3MhR+UzJj30vM9Bxauepi/2VlB8/ACqZWnt0qULNYB9N9hpwqSndC+8tmQRWXp0odx/fVi3M8s+fJsj2rfFDBiAjo7uymPlVBqalsWAD/GSepMBjQroi72+uQzItOnycbpDTpfPNfFpx3Y22u2bBOCqZVIFPFYv5ODUrhg22tZSMihQQil/6v0k2e4Ihel29t0zJkz6tW40/mXdDgF09d5qkcw4V19PruZmsR8KoMf4yM5d+VgXdezg25lr33+H3iwqoEHJQ6i/NZHuGvtTslqv99uZ+k7Z5QOQSRNBex+nB6I81qQxCG2g5hOAus9rbPxGzO5tZ6D37a2iqKho6t69B33jPFPC/aNOlU7hcXblrNnzzfUnT4h0L0YUqJMfmR7USAUKgeEen4sVslNCYXo5B212lnbdSDyC3Ud19R4K79jRs//ShQsMmJVcYWaa8thiXXfwRfWHNO/ZxV6d6Kg9wPJ9gNLSs9jiu+oMe1wBHtPlvxF+WGqoE4JIUe2truJx92YBsoMDS4y7R43JpaE3p/PnWBGP/DsPr3RWpOYxwwuRmXvpmd+IHUjKILVrdLVrW7E9XGbX5k2cvEB/5mdLCbO1mepPnyZTWJjX33r36k3fXQzTZXrTtw10rK6S7hh5F+E0pcZcey31HzCQOnXq6LUfHR+whrlrmE41GTk/wDUDHVPnOEhbNn1CJe+tooIXFwjQLRynDLffQZbY61gJD9DPfzHb4446MDEuXPgOQZdVzsgppYr3W/96+JDtV/OeY8Ov5bhmPz064wkRwywteMEdSbML7aAil15RUr98D8Rhpa2R9wcDBWQYssXHxwimqwvkPVBBwAeXYApr6RFc1CbFnxiYjN7frRB75fKqw7UHxbYzS3b9iS9p1LgJ9NLLywWblTI0LUNkyzYKtg7zWmQpJ5xsmlz5TP6bDa8cYYkU0qsvPjNX5CfAdHyHSiAfr136pS2IB9aueS+PFaUg2Hw8mL6ic+cukX3jkoUf1paLbLWffVpKKSkpdKSuTuzD1Cak3ek8QylDx1Jfa7LPeTXVn1KfPt0oeXCq26/6rdTKevkaLgFc8LX+1HH6M0t1BfvW0tWraDGzrZbdT3hEBCXbhtDE+/NowsT72U/3pNJ3V9H4e+/zYiGCsuPHjgiJBmCffVpRwewtOus8AyAe1ZHe84hh+Zi8Hj0tkQBuYGKSmLLFdR6eni/89e5dOwTzIePRTBxMvmiLSlESNYpiiB+QIQQFeWC8XjReuPgxMjU7mfHxFBsby5F7I3dOLdV/9S1N/8VK3Qsj4k9NjaexEyZ60c8wr/nAd94sFAwQX10kwH1l0fNCDrNHjKabM4ZTz1iLgWu6hJxiEQY6cl/15+IauF4cj5kTb7iRkgalyJm1aN0rvPTsXM+wSVmHJxkGv72BgltKBQUon5b/hBkZSPGiAgMPhVCyknhOBHru+QJ38KZd4RsgfjA8ZAP45Q89ttiql3YtL3tNBGeYVMFkCwwE+Xh/GbuXFtxDc367gKwDElpQdP+QzX1yplg9gk5Ap+MzOgc+DS8goOPTGHj7iFEcGGaKK9Xs3SOWGAHkOgdAPiUAhiwD4H79uVr7i89qqQ6U6lXlD5yyc0vl1hGCQ8KMZbEy5aokX5Ys+r0wPHVUD/eBUQKeAcHf0FsyPQYgZ+DwLNnBgg7LE/lBMNfIxEpLky7vv7uA/nP5m754u4z7eFg+fN4fl73hWZE6a8580VCFFQAY+0/XnxTz4hxsVsls1QaXy+Vsvnhx7sxfzTUHs8JGYRk6u/7UCadkcbBvqxgpIqJX1r95chxyrh9BnXrySbsIVG38EvQKoz5d8TU5SSlZFkyb6vn2YAqkfdw9E5hVA9yyrKpGyl8dtezjjlLN/mo6WLNPNBaNB+vWr31fLBLs1acvvfZKgUhzYhkxOg2RdMPXZ2s45pjCtcR16dJWvulf2Efel5GV7Yl6/c3KsU/GFCa9tXKZk1n3lnwvbIoEvIbaviCir1u/7k+5yutT7nmEJBoxeiw5z5xh8F8XBtixYydK4P04JuPWbBr/L/d53qVD3MWGajXq202aNKzw7f0ThpiRZk1KuS3oCRcA/lV9DUG2WgIWSYr9+/aIDsd3SDEYiyRHnJDhePH5g+J3xTIlWPx/5P9MvI2C6FdZuQoVgFEg6pUrWbXrwReyUczQeybN68UV1LrXkkIt4i0XxcdrCxRn7ZrVQoHQRvh3tTKofLuhlTUmP9Oq4uV3BtwG4BOTs8TCiUDlPI/LkXo96thJTzET4W8AKsCsA8DnGtnffs5y7N5Hl5cV4yHPSmlyXmxqwouGxeoVo/DneB0Ya8xQsD5NWbGq9oVYXjRr9nwhgTqLDg5zp1qVThVDLffLhk45R11AbbPMubVFBHd4vUlpVyADVYI7ZRWO9O0rqA1eYLSqDMAKA7D0GkjXqXz+twy249AuEeQ1NZ2jtGG3suQ2uoFmgBUwue6WAAPYQL4HP6dRrmalXAVaxQ20wRiUtd/q+Xc166ECry97Bf5Y7efwnlvxaB7/4jj5tsr8fwCrW+rvYrQTxhtooYX6bRe4LRi8zA+0mKUzBWmJSDgov9Kg5DDNYWFhVgRQMohSWOtgcFvLHNf/rPnY8+Wn40cojSnGiwIAVQ94pTMQ4cuXFEw6UaIC9gq6Mot4P519fJ7RN1g1I4wWl0iHB/Ew+KmFrTKoKVLVpRwlP+9qbi7i4KmMawVXB9dQ2JOHBQMIbtAQDrBgTJj+e5sbdR/7NvOInLEisQHpVwdBvfr0E0EeEiU6gU2dlL8qunILgupSNtqz7ILSkRRVAja/VtItRsj8MA5Wd+/annjWecYaKD0bfoU23MqSlT54SBot5widQX5eGhw6ZIMEXmS0ADgibjXw3Gj4bIcO6Fcy2NqC9pZxvJLOhm/p3befbmZOm6WTwNu4D+wS+PNXC+gnvzx6ZBoYu2b1W07JzvMqxSlj4NMZeIt7dsob+NNinK0L+tVW0NalDKBgPQwdjA40IaMA72S2cx9N413btD7+SgX9BI9f7Ty+tvIWLF+n0xmQ+hywYNKDU2nw0DThy5GPxpCOx74kI/L2ULbK9po/XvcnG9oYaDYO+5GM4kAwEnl+Ph5xQllrArl/SEBjYAhSiB/lQXCHFwXwYzuYpJCRbHv8eRXINn51ym7kh4gQ5KFPeOt5JSr8Cm7ceTI2V1zKlrybA7cclsHIaTOeEEMYuSS6VKpCeyrCbXGbN2DOnplv/fLYEWHwCOj0grwRo8chLrJAGaEY4e2kI5AiXcpxgIV9nw2xwLlzDWjotqsseGsN+EWQfXZnVnZ1kRcuXBBAa1POkHsJvKU9yh+GK4VSBg1lqNpR8fplLfUvZQkrqT2Et28d7fl35JRs4iL6YRb9ZBoHt/8vwAB7JYJ6prV4pAAAAABJRU5ErkJggg==';
export default image;