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
Ten years in enterprise IT. A decade of operations, five years in a HIPAA-regulated healthcare environment, a year inside a SOC, and five years running operations for the largest automotive brand in the world.
{{< /intro >}}

## The short version

Ten years in enterprise IT, and most of it spent where operations and security overlap.

The last five as Operations Manager at Beyondsoft Consulting, embedded at Toyota Motor North America. Five engineers, a global client account, and the phone that rings when something large is broken. I was the incident manager on those calls: severity, coordination, restoration, and the executive update that follows.

Before that, a year as an Information Security Analyst at TelevisaUnivision, where the title matched the work. SOC triage, LogRhythm administration, correlation rules, and the SIEM migration I planned and ran end to end.

Before that, five years as a system administrator at Cigna HealthCare. HIPAA-regulated, Level 3 escalation, and the place where I learned that audit evidence and a ticket queue are the same job.

Based out of Florida. Bilingual, hablo español.

## The through line

Two tracks have run side by side for my whole career: keeping environments operating, and keeping them defensible. Most of my roles have asked for both at once, and the ones that only asked for one were the exception.

At Cigna I was the escalation point for a support team in a HIPAA-regulated environment, which meant identity administration and audit evidence were part of the same job as the ticket queue. At TelevisaUnivision the title was security analyst and the work matched it: SOC triage, lead LogRhythm administrator, correlation rules and custom parsers, detection coverage mapped to MITRE ATT&CK, spear-phishing investigations, and a SIEM migration I planned and executed end to end.

Then I moved into operations leadership at Beyondsoft, and neither track stopped. I ran incident and problem management for a global client account, owned SLA performance and vendor contracts, coordinated change and maintenance windows, and led five engineers. In the same role I audited client AWS accounts for exploitable misconfigurations, administered Entra ID conditional access and MFA, remediated DDoS vectors through Shield and WAF, owned the certificate lifecycle, and supported the annual SOC review against ISO 27001.

Across three employers I have supported audit and control testing in five regulatory domains: SOX and PCI DSS in media, HIPAA and CMS in healthcare, ISO 27001 in consulting. I have tested control design and operating effectiveness against NIST 800-53 and NIST CSF, tracked findings to closure in ServiceNow against the CMDB, performed user access reviews, and documented formal risk acceptance for approved exceptions.

So I am not picking a lane. Operations leadership and security engineering draw on the same instincts, and I would rather be useful in both than narrow to one. The CISSP and the lab are how I keep the technical side current while the leadership side keeps growing.

## Where I'm Strongest

### Incident management

When a production system is down and five teams are talking at once, someone assigns severity, coordinates the response, decides when to escalate, and tells the client's executives what is happening in language they can act on. I did that for five years. The underrated part is the post-incident review that turns a recurring failure into a runbook change.

### Running a team and a queue

Five engineers, a shared backlog, an on-call rotation, and SLA commitments somebody is measuring. The work is triage discipline, clear ownership, and removing the recurring noise so the team spends its time on what actually matters. Hiring, one-on-ones, and vendor contracts come with it.

### Detection engineering

Writing a correlation rule is easy. Writing one that fires on real adversary behavior, does not bury the analyst in false positives, and maps to a technique you can name is the actual skill. Suppression logic and signal-to-noise are where most SIEM deployments quietly fail.

### Control testing that survives an auditor

Evidence, ownership, and closure. Correlating a finding against the CMDB so it lands on the team that can fix it, then capturing closure evidence before the audit cycle asks for it.

### Identity lifecycle

Joiner, mover, leaver. Least privilege at provisioning, revocation at termination treated as a controlled step rather than an afterthought, and access reviews across AD, Entra ID, and AWS IAM.

### Translating between audiences

Explaining a SIEM finding to an application team, the same finding to a compliance stakeholder, and the business impact of both to a client executive. This is most of the job in any senior role and almost nobody lists it.

## What this site is

Three things, in three registers.

- **[Homelab]({{< ref "homelab" >}})** is the maintained architecture reference for the lab I am building. Hardware, segmentation, service layout. A living document, not a dated post.
- **[Writeups]({{< ref "writeups" >}})** are the formal technical pieces: network segmentation, telemetry pipelines, detection engineering, vulnerability management, control mapping. Methodology and evidence, written for practitioners.
- **[Blog]({{< ref "blog" >}})** is looser and shorter. The reasoning behind a decision, the tradeoff I picked, the occasional mistake worth writing down.

Sanitized artifacts live alongside the writing on [GitHub](https://github.com/labwithchristian): playbooks, configs, detection rules, control mappings.

## What's cooking

{{< pipeline items="CISSP :: In progress :: Targeting November 2026. Deepening the security governance and risk side | Home lab buildout :: Ongoing :: Segmentation, telemetry and detection engineering, documented as I go" >}}

## Find Me

[LinkedIn](https://linkedin.com/in/cybercc)  ·  [GitHub](https://github.com/labwithchristian)
