/* eslint-disable */
import asyncLoader from '../../phet-core/js/asyncLoader.js';
const mipmaps = [{
  "width": 160,
  "height": 39,
  "url": "data:image/png;base64,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"
}, {
  "width": 80,
  "height": 20,
  "url": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAAAUCAYAAAAa2LrXAAAAAklEQVR4AewaftIAAANhSURBVM3BT2gcZRzH4c/3fWc3awLdDSKKpnlNutIYiwUlxKZqKfQggghFvfRSAupJKTQ3tRTMIeBBEFTwUFER9CCIBxWi9aDBIoK0/ishxAxY0TTd7FSbJtud+YmKeLCHZnc2yfOILSSEUIqkXTK7PTOqQA9/EXUHMXB6Lo7PsIWITRRCKHXBeAoHe1Dfnah6h+SriAjhxd9Sg1WMOYxvzRpnLJttinMOPliDE3Ecr7JJxCbYEcIBD0dvQ/c8Kl/ZIUdVwnNtGsCcGWct4z1L6wvYTBOmforjL9hgYgMNhrDXweQDuPsOusjvkmhXCnxvGe9nafox2ecZPDsfxzNsELEBQgilCF4awx163EXdQxKdcNaMl7Pmytdkbzfh6TiOV+kw0WGDIdzdBW9OKBp+0Hk8nZUCH2YpL1hztgHj83E8Qwd5OqgawpEB9NqLrhj2OIej8xywU4598td/Y9nDrlJu1JLkFB3i6ZDhECZGcJNTrljuk9hovRL75bvnzfatVMqlWpJ8Rgd4OmA4hIndaOq4KxZ7xaa5TnC/fOGC2diFSrmrliQnyZknZ9UQjozgJo+7YrEiNl1BMCLvZs1GG5XyylKSfEmOPDkaDGHvAHp1yhW39YotoyAYlY9Ome3JKuXvlpNklpx4chJCKJXQp6+4ws03SWw1JcGIXNe0Zff2VMrv1pLkD3LgyEkBvXNMfqBfYqvqk3hO0XbB6+TEk4OhEI4elH/qkIvEFrddUgOqP5e3FWpJcpI2RbQphNBbQROHFYkcrQFrJhpAA2gCKZABGf/wgAAPREAEFIECUJRR4OoOKeITy54khBNzcTxPGzxtuqHS+8ZxRaM7nWiHAZdMLCMWEXXEJWAVuAKkQAYY/zEgA1LgCrAGrAC/A3XEr4hFjDWEAQWBA7oEVan7I8uGa0nyFm3wtGFHCAfGcM+P+8g7WtMEaiZ+Q1wE1gAjHw6oYyxjLGKcw0iAK4hbEEtmty6Vyz8uJ8kPtMjRBsGxJ1xU9KxfCpw3sWBiGUjJn4AeHP8yIMFYIOM0GbvlvaRnaIOnRYP94bFHnD/6kPOs10UTvyAu03kRcBkw/q9bgNmNSaVyoZbUv6IFEa0Sd+2Xn2ad6ibOc21mLaMb0SfRKgFdiMsYVzMkx7Q1+2nRnzF6KT3MhcM6AAAAAElFTkSuQmCC"
}, {
  "width": 40,
  "height": 10,
  "url": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAKCAYAAADGmhxQAAAAAklEQVR4AewaftIAAAGsSURBVK3BvWtTURjA4d/7nnsFtTmKZlAsJ6GttC5CFRQJQhfBjkVwc3DqoJMfFAURLFK0Q0HQ/hkO6qKbSMFBu1awgleRhoLNNRrhpjnHwaGIJrlJfR5hG5xzUQyXj6CVSdHibhELhG8h1J8FX13FL2XwKEmSTfok9GHIudJJdO6cmjMjosWDAsKfPPAlwPvQWn/s/YvX+JsfkuQjPRJ6NObc1VsaX6uIHtgl5NII8Cr4tVnfXHiXJPfpgaEHU668OKfx9ROqe2Iht1hgWGSggpnYsHZwJa09JSdDTlOuvDij0fRhFUOfiiJmHD1WtXZwJa09IQdDDqOudOOexldGVAzbZEVkDD26bAuspelLujB0Merc6VmNHxxXHeA/2S+iZWT8rS0sf03TVTqI6OK8mLsV0X10sBmEBtAAMqAJeH5TIAJ2ABFgCBSAU6J7L4i5cxue04Ghg+FS6dKMRtNFEeEfsiCsI1SBH0AGtIDAlgC0gAz4CXwGPhGoAQXk0BtrGxtpukQbER1cFHN2CElC4C91hGqAwJYmIEBEezsR6ni+AxEwKTrxEOZp4xe5o39PtARDAgAAAABJRU5ErkJggg=="
}, {
  "width": 20,
  "height": 5,
  "url": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAFCAYAAABFA8wzAAAAAklEQVR4AewaftIAAADeSURBVHXBsS5DYRgG4Pf9/v6TFA2hy98TZ7D2BgxsRhKX0bHdOtocicnsDrgIC4OE3RE5kRiEUz3Vr0nbj6FDHfU8xD/iEFY74o+b5M4SuY4fhdnbvU2vk+m4m2ZZjgWIBQ5DdNB2ldOYjB3xy8SAR7M0mYzbV9nzJUocSrZDY/fM+YtYGIT4QwiskbUmZe+2Wr17/ew9YY6g5Nz5k0i4iRkz4suI3Ih3I3IjCiPq5EbifIIShzmdaKu1L3JUARWgFqC+GPUD1AGoQ1AHoPZBTWE6Amp+eUUfevkNZr4BbhtPILxscOAAAAAASUVORK5CYII="
}, {
  "width": 10,
  "height": 3,
  "url": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAADCAYAAACqPZ51AAAAAklEQVR4AewaftIAAABwSURBVGNkgIJAGTmtBhbWibyMDEYMQPDpP8O5hj+/CzY8eXSVAQiYGKCgiYV1kSQTowsnA6MQMwOjkDAjo0sDC+siBihgZgCCEjlFS0dGJp0//xluPPjPeOPDf8YbH/4z3njB8P8jCx/fk0ufPj4GACQ9IjUSTlLmAAAAAElFTkSuQmCC"
}];
mipmaps.forEach(mipmap => {
  mipmap.img = new Image();
  const unlock = asyncLoader.createLock(mipmap.img);
  mipmap.img.onload = unlock;
  mipmap.img.src = mipmap.url; // trigger the loading of the image for its level
  mipmap.canvas = document.createElement('canvas');
  mipmap.canvas.width = mipmap.width;
  mipmap.canvas.height = mipmap.height;
  const context = mipmap.canvas.getContext('2d');
  mipmap.updateCanvas = () => {
    if (mipmap.img.complete && (typeof mipmap.img.naturalWidth === 'undefined' || mipmap.img.naturalWidth > 0)) {
      context.drawImage(mipmap.img, 0, 0);
      delete mipmap.updateCanvas;
    }
  };
});
export default mipmaps;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJhc3luY0xvYWRlciIsIm1pcG1hcHMiLCJmb3JFYWNoIiwibWlwbWFwIiwiaW1nIiwiSW1hZ2UiLCJ1bmxvY2siLCJjcmVhdGVMb2NrIiwib25sb2FkIiwic3JjIiwidXJsIiwiY2FudmFzIiwiZG9jdW1lbnQiLCJjcmVhdGVFbGVtZW50Iiwid2lkdGgiLCJoZWlnaHQiLCJjb250ZXh0IiwiZ2V0Q29udGV4dCIsInVwZGF0ZUNhbnZhcyIsImNvbXBsZXRlIiwibmF0dXJhbFdpZHRoIiwiZHJhd0ltYWdlIl0sInNvdXJjZXMiOlsiY2Fubm9uQmFzZVRvcF9wbmcuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLyogZXNsaW50LWRpc2FibGUgKi9cclxuaW1wb3J0IGFzeW5jTG9hZGVyIGZyb20gJy4uLy4uL3BoZXQtY29yZS9qcy9hc3luY0xvYWRlci5qcyc7XHJcblxyXG5jb25zdCBtaXBtYXBzID0gW1xyXG4gIHtcclxuICAgIFwid2lkdGhcIjogMTYwLFxyXG4gICAgXCJoZWlnaHRcIjogMzksXHJcbiAgICBcInVybFwiOiBcImRhdGE6aW1hZ2UvcG5nO2Jhc2U2NCxpVkJPUncwS0dnb0FBQUFOU1VoRVVnQUFBS0FBQUFBbkNBWUFBQUNJZWtOTkFBQUFBa2xFUVZSNEFld2FmdElBQUFha1NVUkJWTzNCVDR5Y2RSM0g4ZmZuOTN0bSttZTM4Z3hqa2IzUVgranVtaVk5YlBkZzJtRGJUWlJvdWlhQWtSc0dFbm93OWNDU2lIcm9RaU5jTkI3cXBSZXJrbGd3eEJpYmlCUmlJdHR5RUlKWm1tQ0NvZGc4TldUN2o1MCszWjN0Ym5lZWViNU9yWnFveGJTMWRKNlpuZGVMbnA1MkVqMGZLNFFRUnpCaUVBdEdhTEdjZ0FoY2l6Z3VTTGxxaXBZUGttU0tubzhsZXY1bE1JUXhZTXlidm1qWVNCUDYrQS85d0pBYzEvS081VnpMS2poNzJYaFRqdVBBMUFkSk1rWFAzNGtWTElRUWUzZ3dNaDdPWUJmL2NEZGlWSTRCWUZTT0swYmx1RjUxNEgzTHFRUHZXODQweGduTHFYTlZCSmVBcVV6OHNnbUhreVJKV2FIRUNyUXhoTWNpNCtFTWR0RnlOMkpVanAxeWpNclJ6eWZqTk1hMDVVeWJjY3lhMUxrcWdsY3k4ZU8vSk1saFZoaXhRb1FRNGdnbXlzWTNMc05uK29GeGVjYmxHWkpvaDJPV2M5UnlqbG1UT2xDQzA4dmlCems4bnlSSnlnb2d1bHdJSVk1Z0lqSyszWUExVytRWWwyTmNucUtvQTBldHljRzh5UmtNRHd1NStHRUcrNU1rU2VsaW9vdmRHOEpFWkR6WGhMNHRjdXlXWjFTT0lwdTJuSVBXNUIzTDhiQ1FpYjBuazJRL1hVcDBvY0VReGtyR2dXWFlOQ1F4b1loUk9Uckp0T1hzdDR3VFpwVGh2WWJZODBHU1RORmxSQmNKSWNRZTltRTgwUTlNdUloeGVUclpTOWJrWUo1UnAwWDhxQW43a2lSSjZSS2lTd3lGTUZJMlhscUM0UjF5VExvUy9YU0hPdkJzM3VDWTVaVGdkRlBzT3BFa3gra0NvZ3RzRE9FeGpKLzFnVDN0U3RvaFJ6YzZaam5meXh1MkFETHg1TWtrMlUrSDgzUzRqZmVFNTRGbmhpUU8rTEkyeTlHdE5ramM3N3lteWFrWlg3NDdqai83MGNYMFYzUXcwYUZDQ0hISjdJMGNiZDRsejVNdW9wK1Y0OWs4NHhWcjRyQS9OYVR0U1pLa2RDQlBCd29oeEgzR1d3MjBhY0pGN0hFUlpWYVduWEtzay9pRDJWMXI0YXQ5bGZqbHRJVU80K2t3b2FYUE9Mb0V3M3RkeEVQeXJGU2I1UmlRK0wzbDFRamJYYTFVanRUUzlBd2R4Tk5CUWt2SjdOMEdHdGpySXNibFdlbUc1ZGdwejJ1V2x6THNrV3FsY3FTV3BtZm9FSjRPRVVLSSs0eWpEVFN3MTBXTXk5TnpWVlZpbTd4ZXM3eVVZWTlVSzVVanRUUTlRd2Z3ZElBUVF0eG52TFVFdzN0ZHhMZzhQZit1S3JGTlhxOVpYako0b0w4Uy95Uk4weVVLenRNQjF0OXh4OXNOdEdtdml4aVhwK2ZhcWhKVlNWT1dyMXNORC9SWDRoZlNORjJpd0R3RnQybERlREZEWDVod0VRL0owL08vRGNzeElQRzY1ZXZMYVB2c3hmU25GSmlud080TllTS0hiKzJTWjQrTDZMayt3M0xVZ1hmSjc3bXpFbGN1cE9tckZKU25vQVpER01QNHhaREVmbGVpNThac2xlTUV4aW16clhkVzRsTVgwdlE0QmVRcG9CQkNIQmwvN0lQeXovMHF5dlRjakczeXZFbk92UEdsU2lYK2JTMU56MUF3amdKYVpYcTVDWDNmZHlYNjZibFovY0NrU3BSaGRXUzhHRUtJS1JoUHdReUdzQytIcno4dXo3ano5UHgvcWhKVlNhOWJ2dDZKTlJmUzlGVUt4RkVnUXlHTW1QSE1GamwydTRpZVcyTmNuaDF5WUR3eEdNSVlCZUlva01oNHNROXMwa1gwM0ZxVHJrUS9JTFBmaEJCaUNzSlRFSU1oN0d2QzE3N3BJbTJWbzVNc0FzdEFIVmdFWmszTUllWVFjNGl6aUJxaWhxZ2hhb2g1UkIweGg1aERMQ0FhZ2tVZ0I1cUFBTWV0VVFhQ0hMK3p2T3lNZ1FzWDA4TVVnS2NBUW91TVgyK1I0enN1b3NnV2dYa2dOVEdMT0krWVE4d2pGaEdMaUF6SWdBekl1TFljeUlBTXlJQmxZQkd4aUpoSHpDRlNSQTJ4Z0xpRWFBaHl3SUNJRzdkQjRnVEdLV3lrV29tUDF0STBvYzBjQmJES2RJaVdTUmRSTkJtUUFxZE5uRER4b1lsWkUzV2d3ZTF4R2FnRHN5Wm1UUHpWeEo5TnZHdkdTVFBPWVZ6bStreTZFdjJBTXc1UkFKNDIyeGpDZ3prODliZzhPK1VwZ2d5WUE4NlorQWh4Q2JGTXNUaGdFYU9HTVF2TVlNeGd6QU1OZ1VPVStXOWxvQ3B4MVBKUFZTdXhhbWs2UlJ0NTJpaUVFSzh5WHJrTHJYdmFseWpUWGd2QXJJbHppRXVJSnNWV1JsekMrS2NjV0FRdUFHY3daakRtQVJORWlJaXJodVdZeGpodjlybDFsZmhBbXFaTHRJbW5qVDRkeDk5dHdsY21YTVJtT2RwbERqaHQ0aUppbWM0aHJoRExHTmVTQTR2QUxEQ0RjUTVqQ2NnRkd4RXZXMTV5eHNDRmkrbGgyc1RSSmlHRTJCdFBiWkZqWEo1Mm1BTVNFMmROTk9oTWF4SGkraXdCTXhqdm1iRU1mRjRPeEtPaGhUWnh0SW1IZlJtczNTM1A3YllBSkNiT21talEyUVQwNGJoUkdiQkRqaXZLcGtPMGlhTU5RZ3ZHRTF2a0dKWGpkc21BRDAzTW1HalFQVllqYmtZRmNiOGNUZXkrd1JER2FBTkhHL2ljZmJSTXVvamJKUVZPbVZpayszaGdEZUptYkpkbk5aZ3pQVWNiT0c2ejBJSjRkSmM4QTRoUFdnWjhhT0s4aVp4YjZ3VnI4SVkxS1lLMWlKdXhCdGd1cHlaMjMyQUlZOXhtZndPd1UzVDNzTlBxalFBQUFBQkpSVTVFcmtKZ2dnPT1cIlxyXG4gIH0sXHJcbiAge1xyXG4gICAgXCJ3aWR0aFwiOiA4MCxcclxuICAgIFwiaGVpZ2h0XCI6IDIwLFxyXG4gICAgXCJ1cmxcIjogXCJkYXRhOmltYWdlL3BuZztiYXNlNjQsaVZCT1J3MEtHZ29BQUFBTlNVaEVVZ0FBQUZBQUFBQVVDQVlBQUFBYTJMclhBQUFBQWtsRVFWUjRBZXdhZnRJQUFBTmhTVVJCVk0zQlQyZ2NaUnpINGMvM2ZXYzNhd0xkRFNLS3BubE51dElZaXdVbHhLWnFLZlFnZ2doRnZmUlNBdXBKS1RRM3RSVE1JZUJCRUZUd1VGRVI5Q0NJQnhXaTlhREJJb0swL2lzaHhBeFkwVFRkN0ZTYkp0dWQrWW1LZUxDSFpuYzJ5Zk9JTFNTRVVJcWtYVEs3UFRPcVFBOS9FWFVITVhCNkxvN1BzSVdJVFJSQ0tIWEJlQW9IZTFEZm5haDZoK1NyaUFqaHhkOVNnMVdNT1l4dnpScG5MSnR0aW5NT1BsaURFM0VjcjdKSnhDYllFY0lCRDBkdlEvYzhLbC9aSVVkVnduTnRHc0NjR1djdDR6MUw2d3ZZVEJPbWZvcmpMOWhnWWdNTmhyRFh3ZVFEdVBzT3VzanZrbWhYQ254dkdlOW5hZm94MmVjWlBEc2Z4ek5zRUxFQlFnaWxDRjRhd3gxNjNFWGRReEtkY05hTWw3UG15dGRrYnpmaDZUaU9WK2t3MFdHRElkemRCVzlPS0JwKzBIazhuWlVDSDJZcEwxaHp0Z0hqODNFOFF3ZDVPcWdhd3BFQjlOcUxyaGoyT0llajh4eXdVNDU5OHRkL1k5bkRybEp1MUpMa0ZCM2k2WkRoRUNaR2NKTlRybGp1azlob3ZSTDc1YnZuemZhdFZNcWxXcEo4UmdkNE9tQTRoSW5kYU9xNEt4Wjd4YWE1VG5DL2ZPR0MyZGlGU3JtcmxpUW55WmtuWjlVUWpvemdKbys3WXJFaU5sMUJNQ0x2WnMxR0c1WHl5bEtTZkVtT1BEa2FER0h2QUhwMXloVzM5WW90b3lBWWxZOU9tZTNKS3VYdmxwTmtscHg0Y2hKQ0tKWFFwNis0d3MwM1NXdzFKY0dJWE5lMFpmZjJWTXJ2MXBMa0QzTGd5RWtCdlhOTWZxQmZZcXZxazNoTzBYYkI2K1RFazRPaEVJNGVsSC9xa0l2RUZyZGRVZ09xUDVlM0ZXcEpjcEkyUmJRcGhOQmJRUk9IRllrY3JRRnJKaHBBQTJnQ0taQUJHZi93Z0FBUFJFQUVGSUVDVUpSUjRPb09LZUlUeTU0a2hCTnpjVHhQR3p4dHVxSFMrOFp4UmFNN25XaUhBWmRNTENNV0VYWEVKV0FWdUFLa1FBWVkvekVnQTFMZ0NyQUdyQUMvQTNYRXI0aEZqRFdFQVFXQkE3b0VWYW43STh1R2EwbnlGbTN3dEdGSENBZkdjTStQKzhnN1d0TUVhaVorUTF3RTFnQWpIdzZvWXl4akxHS2N3MGlBSzRoYkVFdG10eTZWeXo4dUo4a1B0TWpSQnNHeEoxeFU5S3hmQ3B3M3NXQmlHVWpKbjRBZUhQOHlJTUZZSU9NMEdidmx2YVJuYUlPblJZUDk0YkZIbkQvNmtQT3MxMFVUdnlBdTAza1JjQmt3L3E5YmdObU5TYVZ5b1piVXY2SUZFYTBTZCsyWG4yYWQ2aWJPYzIxbUxhTWIwU2ZSS2dGZGlNc1lWek1reDdRMSsyblJuekY2S1QzTWhjTTZBQUFBQUVsRlRrU3VRbUNDXCJcclxuICB9LFxyXG4gIHtcclxuICAgIFwid2lkdGhcIjogNDAsXHJcbiAgICBcImhlaWdodFwiOiAxMCxcclxuICAgIFwidXJsXCI6IFwiZGF0YTppbWFnZS9wbmc7YmFzZTY0LGlWQk9SdzBLR2dvQUFBQU5TVWhFVWdBQUFDZ0FBQUFLQ0FZQUFBREdtaHhRQUFBQUFrbEVRVlI0QWV3YWZ0SUFBQUdzU1VSQlZLM0J2V3RUVVJqQTRkLzdubnNGdFRtS1psQXNKNkd0dEM1Q0ZSUUpRaGZCamtWd2MzRHFvSk1mRkFVUkxGSzBRMEhRL2hrTzZxS2JTTUZCdTFhd2dsZVJob0xOTlJyaHBqbkh3YUdJSnJsSmZSNWhHNXh6VVF5WGo2Q1ZTZEhpYmhFTGhHOGgxSjhGWDEzRkwyWHdLRW1TVGZvazlHSEl1ZEpKZE82Y21qTWpvc1dEQXNLZlBQQWx3UHZRV24vcy9ZdlgrSnNma3VRalBSSjZOT2JjMVZzYVg2dUlIdGdsNU5JSThDcjR0Vm5mWEhpWEpQZnBnYUVIVTY2OE9LZng5Uk9xZTJJaHQxaGdXR1NnZ3BuWXNIWndKYTA5SlNkRFRsT3V2RGlqMGZSaEZVT2ZpaUptSEQxV3RYWndKYTA5SVFkRERxT3VkT09leGxkR1ZBemJaRVZrREQyNmJBdXNwZWxMdWpCME1lcmM2Vm1OSHh4WEhlQS8yUytpWldUOHJTMHNmMDNUVlRxSTZPSzhtTHNWMFgxMHNCbUVCdEFBTXFBSmVINVRJQUoyQUJGZ0NCU0FVNko3TDRpNWN4dWUwNEdoZytGUzZkS01SdE5GRWVFZnNpQ3NJMVNCSDBBR3RJREFsZ0MwZ0F6NENYd0dQaEdvQVFYazBCdHJHeHRwdWtRYkVSMWNGSE4yQ0VsQzRDOTFoR3FBd0pZbUlFQkVlenNSNm5pK0F4RXdLVHJ4RU9acDR4ZTVvMzlQdEFSREFnQUFBQUJKUlU1RXJrSmdnZz09XCJcclxuICB9LFxyXG4gIHtcclxuICAgIFwid2lkdGhcIjogMjAsXHJcbiAgICBcImhlaWdodFwiOiA1LFxyXG4gICAgXCJ1cmxcIjogXCJkYXRhOmltYWdlL3BuZztiYXNlNjQsaVZCT1J3MEtHZ29BQUFBTlNVaEVVZ0FBQUJRQUFBQUZDQVlBQUFCRkE4d3pBQUFBQWtsRVFWUjRBZXdhZnRJQUFBRGVTVVJCVkhYQnNTNURZUmdHNFBmOS92NlRGQTJoeTk4VFo3RDJCZ3hzUmhLWDBiSGRPdG9jaWNuc0RyZ0lDNE9FM1JFNWtSaUVVejNWcjBuYmo2RkRIZlU4eEQvaUVGWTc0bytiNU00U3VZNGZoZG5idlUydmsrbTRtMlpaamdXSUJRNURkTkIybGRPWWpCM3h5OFNBUjdNMG1ZemJWOW56SlVvY1NyWkRZL2ZNK1l0WUdJVDRRd2lza2JVbVplKzJXcjE3L2V3OVlZNmc1Tno1azBpNGlSa3o0c3VJM0loM0kzSWpDaVBxNUViaWZJSVNoem1kYUt1MUwzSlVBUldnRnFDK0dQVUQxQUdvUTFBSG9QWkJUV0U2QW1wK2VVVWZldmtOWnI0QmJodFBJTHhzY09BQUFBQUFTVVZPUks1Q1lJST1cIlxyXG4gIH0sXHJcbiAge1xyXG4gICAgXCJ3aWR0aFwiOiAxMCxcclxuICAgIFwiaGVpZ2h0XCI6IDMsXHJcbiAgICBcInVybFwiOiBcImRhdGE6aW1hZ2UvcG5nO2Jhc2U2NCxpVkJPUncwS0dnb0FBQUFOU1VoRVVnQUFBQW9BQUFBRENBWUFBQUNxUFo1MUFBQUFBa2xFUVZSNEFld2FmdElBQUFCd1NVUkJWR05rZ0lKQUdUbXRCaGJXaWJ5TURFWU1RUERwUDhPNWhqKy9Delk4ZVhTVkFRaVlHS0NnaVlWMWtTUVRvd3NuQTZNUU13T2prREFqbzBzREMrc2lCaWhnWmdDQ0VqbEZTMGRHSnAwLy94bHVQUGpQZU9QRGY4WWJILzR6M25qQjhQOGpDeC9mazB1ZlBqNEdBQ1E5SWpVU1RsTG1BQUFBQUVsRlRrU3VRbUNDXCJcclxuICB9XHJcbl07XHJcbm1pcG1hcHMuZm9yRWFjaCggbWlwbWFwID0+IHtcclxuICBtaXBtYXAuaW1nID0gbmV3IEltYWdlKCk7XHJcbiAgY29uc3QgdW5sb2NrID0gYXN5bmNMb2FkZXIuY3JlYXRlTG9jayggbWlwbWFwLmltZyApO1xyXG4gIG1pcG1hcC5pbWcub25sb2FkID0gdW5sb2NrO1xyXG4gIG1pcG1hcC5pbWcuc3JjID0gbWlwbWFwLnVybDsgLy8gdHJpZ2dlciB0aGUgbG9hZGluZyBvZiB0aGUgaW1hZ2UgZm9yIGl0cyBsZXZlbFxyXG4gIG1pcG1hcC5jYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCAnY2FudmFzJyApO1xyXG4gIG1pcG1hcC5jYW52YXMud2lkdGggPSBtaXBtYXAud2lkdGg7XHJcbiAgbWlwbWFwLmNhbnZhcy5oZWlnaHQgPSBtaXBtYXAuaGVpZ2h0O1xyXG4gIGNvbnN0IGNvbnRleHQgPSBtaXBtYXAuY2FudmFzLmdldENvbnRleHQoICcyZCcgKTtcclxuICBtaXBtYXAudXBkYXRlQ2FudmFzID0gKCkgPT4ge1xyXG4gICAgaWYgKCBtaXBtYXAuaW1nLmNvbXBsZXRlICYmICggdHlwZW9mIG1pcG1hcC5pbWcubmF0dXJhbFdpZHRoID09PSAndW5kZWZpbmVkJyB8fCBtaXBtYXAuaW1nLm5hdHVyYWxXaWR0aCA+IDAgKSApIHtcclxuICAgICAgY29udGV4dC5kcmF3SW1hZ2UoIG1pcG1hcC5pbWcsIDAsIDAgKTtcclxuICAgICAgZGVsZXRlIG1pcG1hcC51cGRhdGVDYW52YXM7XHJcbiAgICB9XHJcbiAgfTtcclxufSApO1xyXG5leHBvcnQgZGVmYXVsdCBtaXBtYXBzOyJdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQSxPQUFPQSxXQUFXLE1BQU0sbUNBQW1DO0FBRTNELE1BQU1DLE9BQU8sR0FBRyxDQUNkO0VBQ0UsT0FBTyxFQUFFLEdBQUc7RUFDWixRQUFRLEVBQUUsRUFBRTtFQUNaLEtBQUssRUFBRTtBQUNULENBQUMsRUFDRDtFQUNFLE9BQU8sRUFBRSxFQUFFO0VBQ1gsUUFBUSxFQUFFLEVBQUU7RUFDWixLQUFLLEVBQUU7QUFDVCxDQUFDLEVBQ0Q7RUFDRSxPQUFPLEVBQUUsRUFBRTtFQUNYLFFBQVEsRUFBRSxFQUFFO0VBQ1osS0FBSyxFQUFFO0FBQ1QsQ0FBQyxFQUNEO0VBQ0UsT0FBTyxFQUFFLEVBQUU7RUFDWCxRQUFRLEVBQUUsQ0FBQztFQUNYLEtBQUssRUFBRTtBQUNULENBQUMsRUFDRDtFQUNFLE9BQU8sRUFBRSxFQUFFO0VBQ1gsUUFBUSxFQUFFLENBQUM7RUFDWCxLQUFLLEVBQUU7QUFDVCxDQUFDLENBQ0Y7QUFDREEsT0FBTyxDQUFDQyxPQUFPLENBQUVDLE1BQU0sSUFBSTtFQUN6QkEsTUFBTSxDQUFDQyxHQUFHLEdBQUcsSUFBSUMsS0FBSyxDQUFDLENBQUM7RUFDeEIsTUFBTUMsTUFBTSxHQUFHTixXQUFXLENBQUNPLFVBQVUsQ0FBRUosTUFBTSxDQUFDQyxHQUFJLENBQUM7RUFDbkRELE1BQU0sQ0FBQ0MsR0FBRyxDQUFDSSxNQUFNLEdBQUdGLE1BQU07RUFDMUJILE1BQU0sQ0FBQ0MsR0FBRyxDQUFDSyxHQUFHLEdBQUdOLE1BQU0sQ0FBQ08sR0FBRyxDQUFDLENBQUM7RUFDN0JQLE1BQU0sQ0FBQ1EsTUFBTSxHQUFHQyxRQUFRLENBQUNDLGFBQWEsQ0FBRSxRQUFTLENBQUM7RUFDbERWLE1BQU0sQ0FBQ1EsTUFBTSxDQUFDRyxLQUFLLEdBQUdYLE1BQU0sQ0FBQ1csS0FBSztFQUNsQ1gsTUFBTSxDQUFDUSxNQUFNLENBQUNJLE1BQU0sR0FBR1osTUFBTSxDQUFDWSxNQUFNO0VBQ3BDLE1BQU1DLE9BQU8sR0FBR2IsTUFBTSxDQUFDUSxNQUFNLENBQUNNLFVBQVUsQ0FBRSxJQUFLLENBQUM7RUFDaERkLE1BQU0sQ0FBQ2UsWUFBWSxHQUFHLE1BQU07SUFDMUIsSUFBS2YsTUFBTSxDQUFDQyxHQUFHLENBQUNlLFFBQVEsS0FBTSxPQUFPaEIsTUFBTSxDQUFDQyxHQUFHLENBQUNnQixZQUFZLEtBQUssV0FBVyxJQUFJakIsTUFBTSxDQUFDQyxHQUFHLENBQUNnQixZQUFZLEdBQUcsQ0FBQyxDQUFFLEVBQUc7TUFDOUdKLE9BQU8sQ0FBQ0ssU0FBUyxDQUFFbEIsTUFBTSxDQUFDQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUUsQ0FBQztNQUNyQyxPQUFPRCxNQUFNLENBQUNlLFlBQVk7SUFDNUI7RUFDRixDQUFDO0FBQ0gsQ0FBRSxDQUFDO0FBQ0gsZUFBZWpCLE9BQU8ifQ==