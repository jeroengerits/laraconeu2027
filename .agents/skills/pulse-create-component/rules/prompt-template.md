# Prompt Template

When the user asks how to start, recommend this prompt:

```text
Use `pulse-create-component`.

I want to create a React component for [component/use case].

Ask me the questions needed to gather a complete component brief. Then capture
routing signals and hand off to `pulse-workflow-orchestrator`, which audits
existing components, decides whether to reuse or create, proposes the API and
architecture, defines behaviour tests, and asks for approval before
implementation.
```
