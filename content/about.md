---
title: "whoami"
description: "Christian Carrasco: how I work across IT operations and security, and who I am outside of it."
showDate: false
showAuthor: false
showReadingTime: false
showTableOfContents: true
showWordCount: false
showPagination: false
---

{{< intro image="img/author.jpg" alt="Christian Carrasco" >}}
I'm Christian. For ten plus years I've worked where IT operations and security meet: keeping enterprise systems running, keeping them defensible, and staying steady on the call when something big breaks.
{{< /intro >}}

## Why operations and security

Two tracks have run side by side for my whole career: keeping environments operating, and keeping them defensible. Most of my roles have asked for both at once, and the ones that only asked for one were the exception.

Operations leadership and security operations draw on the same instincts: triage under pressure, clear ownership, and evidence that holds up. I've been trusted with both, and I keep the technical side sharp through the CISSP and my home lab while the leadership side keeps growing.

The dates, titles, and details are on my [resume]({{< ref "resume" >}}). This page is about how I work, and who I am outside of it.

## How I work

### IT Service Management {.area}

#### Incident management

When a production system is down and five teams are talking at once, someone has to assign severity, coordinate the response, decide when to escalate, and tell the client's executives what is happening in language they can act on. I did that for over five years. The underrated part is the post-incident review that turns a recurring failure into a lasting fix, so the same problem doesn't page anyone again.

### IT Leadership & Operations {.area}

#### Running a team and a queue

Five engineers, a shared backlog, an on-call rotation, and SLA commitments somebody is measuring. The work is triage discipline, clear ownership, and removing the recurring noise so the team spends its time on what actually matters. Hiring, one-on-ones, and vendor contracts come with it.

#### Translating between audiences

Explaining a SIEM finding to an application team, the same finding to a compliance stakeholder, and the business impact of both to a client executive. It's most of the job in any senior role, and employers rarely list it. Done well, everyone leaves the call knowing what happens next and why it matters to them.

### Infrastructure & Cloud {.area}

#### Keeping it up and keeping it closed

Uptime and exposure are the same conversation. That means coordinating change and maintenance windows so a fix doesn't become the next outage, watching service health in Dynatrace and PagerDuty, and owning the certificate lifecycle so nothing expires quietly. On the cloud side, it means auditing AWS accounts for exploitable firewall and DNS misconfigurations and closing DDoS exposure with AWS Shield, WAF, and CDN.

### Cybersecurity {.area}

#### Detection engineering

Writing a correlation rule is easy. Writing one that fires on real adversary behavior, does not bury the analyst in false positives, and maps to a technique you can name is the actual skill. Suppression logic and signal-to-noise are where most SIEM implementations quietly fail.

#### Control testing that survives an auditor

Evidence, ownership, and closure. Correlating a finding against the CMDB so it lands with the team that can fix it, then capturing closure evidence before the audit cycle asks for it.

#### Identity lifecycle

Joiner, mover, leaver. Least privilege at provisioning, revocation at termination treated as a controlled step rather than an afterthought, and access reviews across Active Directory and Entra ID.

## Off the clock

I've known my beautiful wife for quite a while, and winning her over took longer than any incident I ever managed. Once I finally did, we dated for four years, and as of 2026 we've been happily married for more than three. We recently welcomed our son, and I am grateful to the Lord Jesus Christ for blessing us with him.

The house is rarely quiet. Two doodles run the place, along with a parrot that talks, at least when it isn't busy inventing new sounds and dialects.

Where we live, natural springs are never far away. When the Florida heat and humidity settle in, a cold, clear spring is the best part of the weekends, and it hasn't gotten old yet.

If the parrot ever learns a new word worth sharing, you'll hear about it here first.

## What you'll find here

The [Homelab]({{< ref "homelab" >}}) page is the running reference for the lab I'm building: hardware, segmentation, and service layout. Sanitized configs and playbooks go on [GitHub](https://github.com/labwithchristian) as the build grows.

{{< connect-mini url="https://linkedin.com/in/cybercc" label="Connect on LinkedIn" >}}
Thanks for stopping by. Let's connect!
{{< /connect-mini >}}
