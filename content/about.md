---
title: "whoami"
description: "Christian Carrasco: ten years in enterprise IT operations and security, moving back into hands-on security work."
showDate: false
showAuthor: false
showReadingTime: false
showTableOfContents: true
showWordCount: false
---

{{< intro image="img/author.jpg" alt="Christian Carrasco" >}}
Ten plus years in enterprise IT. Over a decade of operations, five years in a HIPAA-regulated healthcare environment, a year inside a SOC, and five years running operations for the largest automotive brand in the world.
{{< /intro >}}

## The short version

Ten years in enterprise IT, and most of it spent where operations and security overlap.

The last five as Operations Manager at Beyondsoft Consulting, on assignment at Toyota Motor North America. Five engineers, a global client account, and the phone that rings when something large is broken. I was the incident manager on those calls: severity, coordination, restoration, and the executive update that follows.

Before that, a year as an Information Security Analyst at TelevisaUnivision, where the title matched the work. SOC alerts triage and response, LogRhythm administration, correlation rules, email phishing investigations, and end user security awareness training.

Before that, five years as a system administrator at Cigna HealthCare. HIPAA-regulated, supporting from PXE image server configurations to identity access management escalations leveraging Active Directory for users and executives; including machines, servers for onboarding and off-boarding.

Based out of Florida. Bilingual, hablo español.

## The through line

Two tracks have run side by side for my whole career: keeping environments operating, and keeping them defensible. Most of my roles have asked for both at once, and the ones that only asked for one were the exception.

At Cigna I was the escalation point for a support team in a HIPAA-regulated environment, which meant identity administration and audit evidence were part of the same job as the ticket queue. At TelevisaUnivision the title was security analyst and the work matched it: SOC triage, lead LogRhythm administrator, correlation rules and custom parsers, detection coverage mapped to MITRE ATT&CK, spear-phishing investigations, and a SIEM migration I planned.

Then I moved into operations leadership at Beyondsoft, and neither track stopped. I ran incident and problem management for a global client account, owned SLA performance and vendor contracts, coordinated change and maintenance windows, and led five engineers. In the same role I audited client AWS accounts for exploitable firewalls and DNS misconfigurations, administered Entra ID conditional access and MFA, remediated DDoS vectors through Shield, owned the SSL certificate lifecycle, and supported the annual SOC review against ISO 27001.

Across three employers I have supported audit and control testing in five regulatory domains: SOX and PCI DSS in media, HIPAA and CMS in healthcare, ISO 27001 in consulting. I have tested control design and operating effectiveness against NIST 800-53 and NIST CSF, tracked findings to closure in ServiceNow against the CMDB, performed user access reviews, and documented formal risk acceptance for approved exceptions.

So I am not picking a lane. Operations leadership and security operations draw on the same instincts, and I would rather be useful in both than narrow to one. The CISSP and the lab are how I keep the technical side current while the leadership side keeps growing.

## Where I'm strongest

### Incident management

When a production system is down and five teams are talking at once, someone assigns severity, coordinates the response, decides when to escalate, and tells the client's executives what is happening in language they can act on. I did that for over five years. The underrated part is the post-incident review that turns a recurring failure into a direct countermeasure changes to prevent the issue from occurring again.

### Running a team and a queue

Five engineers, a shared backlog, an on-call rotation, and SLA commitments somebody is measuring. The work is triage discipline, clear ownership, and removing the recurring noise so the team spends its time on what actually matters. Hiring, one-on-ones, and vendor contracts come with it.

### Detection engineering

Writing a correlation rule is easy. Writing one that fires on real adversary behavior, does not bury the analyst in false positives, and maps to a technique you can name is the actual skill. Suppression logic and signal-to-noise are where most SIEM implementations quietly fail.

### Control testing that survives an auditor

Evidence, ownership, and closure. Correlating a finding against the CMDB so it lands on the owners or team that can fix it, then capturing closure evidence before the audit cycle asks for it.

### Identity lifecycle

Joiner, mover, leaver. Least privilege at provisioning, revocation at termination treated as a controlled step rather than an afterthought, and access reviews across AD, and Entra ID.

### Translating between audiences

Explaining a SIEM alert finding to an application team, the same finding to a compliance stakeholder, and the business impact of both to a client executive. This is most of the job in any senior role and rarely employers list it. This speaks on the art and skill that is required to intersect the delivery of information through multiple audiences without frustrations or lost stares given when the big picture was missed.

## Off the clock

I've known my beautiful wife for quite a while, and winning her over took longer than any incident I ever managed. Once I finally did, we dated for seven years, and as of 2026 we've been married for more than three. We recently welcomed our son, and I am grateful to the Lord Jesus Christ for blessing us with him.

The house is rarely quiet. Two doodles run the place, along with a parrot that talks, at least when it isn't busy inventing new sounds and dialects.

Where we live, natural springs are never far away. When the Florida heat and humidity settle in, a cold, clear spring is the best part of the weekends, and it hasn't gotten old yet.

If the parrot ever learns a new word worth sharing, you'll hear about it here first.

## What you'll find here

Three things, in three registers.

- **[Homelab]({{< ref "homelab" >}})** is the maintained architecture reference for the lab I am building. Hardware, segmentation, service layout. A living document, not a dated post.
- **[Writeups]({{< ref "writeups" >}})** are the formal technical pieces: network segmentation, telemetry pipelines, detection engineering, vulnerability management, control mapping. Methodology and evidence, written for practitioners.
- **[Blog]({{< ref "blog" >}})** is looser and shorter. The reasoning behind a decision, the tradeoff I picked, the occasional mistake worth writing down.

Sanitized artifacts live alongside the writing on [GitHub](https://github.com/labwithchristian): playbooks, configs, detection rules, control mappings.

## What's cooking

{{< pipeline items="CISSP :: In progress :: Targeting November 2026. Deepening the security governance and risk side | Home lab buildout :: Ongoing :: Segmentation, telemetry and detection engineering, documented as I go" >}}

## Find Me

{{< social items="linkedin|LinkedIn|https://linkedin.com/in/cybercc, github|GitHub|https://github.com/labwithchristian" >}}
