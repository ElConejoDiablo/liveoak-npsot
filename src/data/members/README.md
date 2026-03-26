# Member Allowlist

This folder stores the server-only active member roster used for member portal access checks.

Use this line format in [active-members.md](/Users/svenmesecke/Desktop/Live%20Oak%20Chapter%20-%20NPSOT/src/data/members/active-members.md):

`- Full Name | email@example.com | role`

Allowed roles:
- `admin`
- `member`

To add a member:
- add a new line in the required format
- use the member's preferred full name
- keep the email unique

To remove a member:
- delete that member's line completely

Important reminders:
- this file is server-only and must never be moved into `public` or rendered in the browser
- emails must be unique
- use one member per line
