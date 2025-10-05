# Printer Offline — Quick Fix
**Scope:** Windows/macOS • Networked printers  
**Symptoms:** Users cannot print. Printer shows "Offline" or "Unavailable".

## Steps
1) Verify power and network: printer is on, Ethernet/Wi-Fi connected, no error lights.  
2) Check user device: ensure same network/VLAN.  
3) Re-add printer:  
   - Windows: Settings → Bluetooth & devices → Printers & scanners → Add device  
   - macOS: System Settings → Printers & Scanners → Add Printer  
4) Clear job queue and restart spooler (Windows): services.msc → Print Spooler → Restart  
5) Print a test page.  
6) If still offline, reseat network cable or reboot printer.  

## Prevention
- Post a one-pager with queue name and IP.  
- Label printers with room/location and IP address.  
