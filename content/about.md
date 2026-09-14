---
title: "whoami"
description: "Christian Carrasco: ten years in enterprise IT operations and security, moving back into hands-on security work."
showDate: false
showAuthor: false
showReadingTime: false
showTableOfContents: true
showWordCount: false
---

{{< lead >}}
Ten years in enterprise IT. A decade of operations, five years in a HIPAA-regulated healthcare environment, a year inside a SOC, and five years running operations for one of the largest automotive brands in the world.
{{< /lead >}}

## The short version

I am Christian Carrasco. I spent the last five years as Operations Manager at Beyondsoft Consulting, embedded at Toyota Motor North America, where I led a five-person engineering team and served as incident commander for high-impact production events. Before that I was an Information Security Analyst at TelevisaUnivision, and before that a system administrator at Cigna HealthCare for five years.

I live in Ocala, Florida. I am bilingual in English and Spanish.

## The pivot

The security work was never missing from my career. It was missing from my title.

At TelevisaUnivision I did the job outright: SOC triage, lead LogRhythm administrator, correlation rules and custom parsers, detection coverage mapped to MITRE ATT&CK, spear-phishing investigations against senior executives. I planned and executed a SIEM migration onto a restructured server architecture, then validated detection coverage afterward so monitoring did not silently degrade.

Then I moved into operations leadership, and the security work came with me. At Beyondsoft I audited client AWS accounts for misconfigurations that could become exploitable, administered Entra ID with conditional access and MFA enforcement, remediated DDoS attack vectors through AWS Shield and WAF, and owned the SSL/TLS certificate lifecycle across client domains. I supported the annual SOC compliance review against ISO 27001, reviewing identified risks and giving feedback on remediation adequacy and residual risk.

Across three employers I have supported audit and control testing in five regulatory domains: SOX and PCI DSS in media, HIPAA and CMS in healthcare, and ISO 27001 in consulting. I have tested control design and operating effectiveness against NIST 800-53 and NIST CSF, tracked findings to closure in ServiceNow against the CMDB, performed user access reviews, and documented formal risk acceptance for approved exceptions.

So the pivot is less a career change than a correction. I am pursuing the CISSP to formalize it, and building a lab in public to prove the hands-on side is still current rather than something I did in 2020.

## Where I have worked

**Operations Manager, Beyondsoft Consulting, 2021 to 2026.** Embedded at Toyota Motor North America on a five-year engagement. The role ran on two tracks at once. I owned the operational health of the account, commanding major incidents through restoration and executive communication, running the post-incident reviews that converted recurring failures into preventive controls, holding SLA performance across teams, and leading five engineers through hiring, development and capacity planning along with the budget and vendor contracts behind the tooling. I also stayed hands-on underneath it, auditing client AWS accounts for misconfigurations before they became incidents, administering Entra ID conditional access and MFA, defending client applications against DDoS through Shield, WAF and CDN, and owning the DNS and TLS certificate hygiene that prevents the outages nobody ever hears about.

**Information Security Analyst, TelevisaUnivision, 2019 to 2020.** One title covering three jobs that are usually three people. As an analyst: SIEM triage across networks, endpoints and servers, event correlation across firewalls, proxies and applications to reconstruct incident timelines, and the spear-phishing and whale-phishing investigations aimed at senior staff. As an engineer: lead LogRhythm administrator, building and tuning correlation rules, writing custom parsers for malformed log sources, and mapping detection coverage to MITRE ATT&amp;CK so gaps got prioritized against real adversary behavior. As an architect: planning and executing the SIEM migration onto a restructured server estate, sizing it against log growth and licensing limits, and validating coverage afterward. Control testing, Rapid7 scanning, and vendor evaluation with the Security Director's sponsorship ran alongside all of it.

**System Administrator, Cigna HealthCare, 2014 to 2019.** Five years in a HIPAA-regulated environment, and where the identity and compliance discipline I still work from was formed. Level 3 escalation point for a support team of four, closing what lower tiers could not across identity, endpoint, application and connectivity. Underneath the queue was a real administration practice: Active Directory and Azure AD, Exchange permissions, Group Policy, MFA, and role-based access applied at provisioning and revoked as a controlled step at termination. I owned onboarding end to end, built the standard images and SOPs behind it, and pushed security agents and patches through SCCM. In a regulated environment, supplying evidence to audit and testing disaster recovery with the business were routine rather than exceptional.

**IT Support Specialist, Commonwealth-Altadis, 2013 to 2014.** A contract role, mostly deployment at scale: imaging and rolling out 300+ machines behind a sales force of over 1,500 agents, with Active Directory provisioning and ServiceNow asset records alongside it. Where I learned that accurate records and repeatable builds are what make everything after them possible.

## What I am actually good at

**Incident command.** When a production system is down and five teams are talking at once, someone has to assign severity, coordinate the response, decide when to escalate, and tell the client's executives what is happening in language they can act on. I have done that for five years. The part people underrate is the post-incident review that turns a recurring failure into a runbook change.

**Detection engineering.** Writing a correlation rule is easy. Writing one that fires on real adversary behavior, does not bury the analyst in false positives, and maps to a technique you can name is the actual skill. Suppression logic and signal-to-noise are where most SIEM deployments quietly fail.

**Control testing that survives an auditor.** Evidence, ownership, and closure. Correlating a finding against the CMDB so it lands on the team that can actually fix it, then capturing the closure evidence before the audit cycle asks for it.

**Identity lifecycle.** Joiner, mover, leaver. Least privilege on provisioning, and timely revocation on termination treated as a controlled step rather than an afterthought. Access reviews across AD, Entra ID, and AWS IAM.

**Translating between audiences.** Explaining a SIEM finding to an application team, and the same finding to a compliance stakeholder, and the business impact of both to a client executive. This is most of the job in any senior role and almost nobody lists it.

## What this site is

Three things, in three registers.

- **[Homelab]({{< ref "homelab" >}})** is the maintained architecture reference for the lab I am building. Hardware, segmentation, service layout. A living document, not a dated post.
- **[Writeups]({{< ref "writeups" >}})** are the formal technical pieces: network segmentation, telemetry pipelines, detection engineering, vulnerability management, control mapping. Methodology and evidence, written for practitioners.
- **[Blog]({{< ref "blog" >}})** is looser and shorter. The reasoning behind a decision, the tradeoff I picked, the occasional mistake worth writing down.

Sanitized artifacts live alongside the writing on [GitHub](https://github.com/labwithchristian): playbooks, configs, detection rules, control mappings.

## Credentials

**Education**

B.S. Network Operations and Security, Western Governors University, 2017 to 2021. Completed while working full time, first in a Level 3 escalation role and then as a security analyst.

**Certifications**

Certified Ethical Hacker (CEH), EC-Council  ·  CompTIA Security+  ·  CompTIA Project+  ·  AWS Certified Cloud Practitioner  ·  Cisco CCNA Routing &amp; Switching  ·  ITIL v4 Foundation

**Competition**

National Cyber League Individual Game, 2019 to 2020 seasons. 1,470 of 3,000 points at 72.9% accuracy in Fall 2019, strongest in OSINT, cryptography, wireless access exploitation, network traffic analysis, password cracking, and log analysis.

## What's cooking

Certifications are snapshots. This is what is in progress now.

{{< pipeline items="CISSP :: Nov 2026 :: Formalizing the move into security governance and risk | Home lab buildout :: Ongoing :: Segmentation, telemetry and detection engineering, documented as I go" >}}

## Elsewhere

[LinkedIn](https://linkedin.com/in/cybercc)  ·  [GitHub](https://github.com/labwithchristian)
