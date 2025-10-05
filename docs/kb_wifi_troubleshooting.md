# Wi-Fi Troubleshooting (Windows/macOS)
**Scope:** City SSID/Guest SSID • Authentication dropouts

## Steps
1) Confirm SSID and credentials/MFA are correct.  
2) Forget and rejoin the network.  
3) Check OS and wireless driver updates.  
4) Diagnostics:  
   - Windows: `netsh wlan show interfaces`, `ipconfig /all`  
   - macOS: Wireless Diagnostics (⌥ Option + Wi-Fi icon)  
5) DNS refresh: `ipconfig /flushdns` (Win) or `sudo dscacheutil -flushcache; sudo killall -HUP mDNSResponder` (macOS)  
6) Move closer to AP; test 2.4 GHz vs 5 GHz.  

## Prevention
- Keep drivers updated.  
- Provide a “How to connect” one-pager for new staff.  
