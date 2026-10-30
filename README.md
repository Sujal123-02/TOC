# RegexLab: Email, Password & Username Validation Using Regular Expressions and Finite Automata

A Theory of Computation (TOC) Mini Project demonstrating practical applications of Regular Expressions (Regex), their mathematical equivalence to Finite Automata, and client-side input validation.

---

## 1. Project Objective

The primary objective of **RegexLab** is to bridge the gap between formal language theory in Computer Science and real-world software engineering. Developed for a Computer Engineering curriculum in the **Theory of Computation (TOC)** course under the application domain *Email and Password Validation*, this web application illustrates:
1. How formal regular expressions enforce input validation contracts in client-side software.
2. How regular expressions map directly to **Nondeterministic Finite Automata (NFA)** via Thompson's Construction.
3. How NFAs are transformed into **Deterministic Finite Automata (DFA)** through Subset Construction.
4. How redundant states in a DFA are minimized using state equivalence partitioning to achieve $O(n)$ deterministic pattern matching.

---

## 2. Problem Statement

User input validation is one of the most critical security and data-integrity frontiers in modern computer systems. Malformed inputs, unexpected symbols, or malicious payloads can cause software vulnerabilities, database corruption, or security exploits.

In software engineering, Regular Expressions are the standard mechanism to specify permissible input formats. However, students often treat regular expressions as opaque "magic strings" without understanding their computational foundation:
- How does a pattern match from beginning (`^`) to end (`$`)?
- What is the computational cost of lookahead assertions?
- Why do pure regular expressions guarantee linear $O(n)$ scanning time without catastrophic exponential backtracking?
- How does an automaton mathematically transition across states when parsing input symbols?

**RegexLab** solves this educational problem by combining a live, interactive input validator with formal language theory, structural regex breakdowns, and step-by-step automata diagrams.

---

## 3. Technologies Used

RegexLab is intentionally built with **100% vanilla web technologies**, strictly adhering to the constraint of zero external frameworks, libraries, or build steps:

- **HTML5:** Semantic document structure, accessible ARIA attributes (`aria-live="polite"`, `role="status"`), and form controls.
- **CSS3:** Pure modern stylesheet adopting an ultra-clean, minimal, technical black theme (`#000000` base, `#0A0A0A` cards, `#8B5CF6` violet accents, `#22C55E` success, `#EF4444` error), CSS variables, flexbox, responsive CSS grids, and `@media (prefers-reduced-motion)` accessibility support.
- **JavaScript (ES6+):** Pure client-side validation logic, state machine execution tracing, DOM manipulation, diagnostic feedback generation, and clipboard management.
- **Inline SVG:** Scalable, resolution-independent vector diagrams for Thompson's NFA, Subset Construction DFA, and Minimized DFA.

> **Zero Dependencies:** No React, Angular, Vue, Tailwind, Bootstrap, Node.js runtime, backend server, database, external API, or external font CDN. The project executes locally by opening `index.html` in any modern web browser.

---

## 4. Main Features & Application Interface

1. **Interactive Multi-Rule Validation Engine:**
   - Supports 5 predefined regular expressions: Username, Email, Strong Password, Password with Digit, and Password Length/Allowed Characters.
   - Dynamic placeholder and active rule banner.
   - Preserves all input characters and spaces without automatic trimming, ensuring exact regular expression matching.
   - Distinguishes empty input (`"Please enter a value to validate."`) from ordinary regex mismatches.
   - Dedicated keyboard support (submits on `Enter` key).

2. **Precise Diagnostic Feedback:**
   - Rather than displaying a generic error message, the validator pinpoints the exact unsatisfied criteria (e.g., missing uppercase letter, disallowed symbol, length out of bounds, missing `@` delimiter).
   - Valid inputs receive a clear green badge and structural confirmation.

3. **Live Token-by-Token Regex Breakdown:**
   - Displays a structured tabular decomposition of the active regular expression, explaining anchors (`^`, `$`), character classes (`[A-Za-z]`), quantifiers (`{3,14}`, `+`), and lookaheads (`(?=...)`).

4. **Interactive Sample Test Suite:**
   - Provides 10 curated test cases (5 valid, 5 invalid) for each rule.
   - Single-click loading: clicking any test case automatically populates the input field and triggers validation.

5. **Regular Expression Reference Library:**
   - Compact reference cards displaying each rule's formal expression, description, and requirements.
   - Integrated "Copy Regex" button with visual confirmation.

6. **Comprehensive Theory of Computation Section:**
   - Detailed theoretical explanations of Regular Expressions, Regular Languages, NFAs, DFAs, and conversion algorithms.
   - Rigorous case study on the language $L = \{ab, ac\}$ generated by $a(b|c)$ over $\Sigma = \{a, b, c\}$.
   - Complete Thompson's NFA diagram with $\epsilon$-transitions and transition table.
   - Subset Construction table and converted DFA diagram with dead/trap state.
   - State equivalence partitioning proof and Minimized DFA diagram.
   - **Interactive Automata Execution Tracer:** Step-by-step state simulation for strings over $\{a, b, c\}$.

---

### Application Screenshots & Visual Demonstration

#### 1. Email Validation — Valid Input
When a well-formed email address (e.g., `student123@yahoo.com`) is evaluated, the interface confirms that the local mailbox part, the `@` symbol, the domain host, and the top-level domain (`.com`) strictly satisfy the pattern.

![Email Validation - Valid Input](Images/Screenshot%202026-10-29%20223925.png)
*Figure 4.1: Live validation passing a valid email address with green status badge and structural criteria confirmation.*

---

#### 2. Email Validation — Targeted Diagnostic Feedback
When an invalid format is entered (such as `student123@yahoo.com23`), the engine identifies the exact structural violation rather than giving a vague error. Here, it flags that the extension `.com23` contains numbers, violating the constraint that top-level domains must consist of at least two English letters.

![Email Validation - Targeted Diagnosis](Images/Screenshot%202026-10-29%20223945.png)
*Figure 4.2: Targeted diagnostic feedback identifying an invalid top-level domain (TLD) extension.*

---

#### 3. Strong Password Validation — Valid Input
For enterprise password enforcement, the pattern requires at least one uppercase letter, one lowercase letter, one digit, and one permitted special character from `{@, $, !, %, *, ?, &}` with a minimum length of 8. Entering `Secure$2026` satisfies all lookahead constraints and boundary conditions.

![Strong Password - Valid Input](Images/Screenshot%202026-10-29%20233647.png)
*Figure 4.3: Strong Password validation verifying all four positive lookaheads and length criteria.*

---

#### 4. Strong Password Validation — Targeted Failure Diagnosis
If an input like `SUJAL@123` is submitted, the engine executes individual lookahead checks and isolates the failure: the absence of a lowercase letter.

![Strong Password - Missing Lowercase](Images/Screenshot%202026-10-29%20234116.png)
*Figure 4.4: Diagnostic feedback pinpointing the missing lowercase letter in an invalid password submission.*

---

#### 5. Interactive Sample Test Suite ("Try These Examples")
Each validation rule includes 10 pre-configured test cases (5 valid and 5 invalid) organized into two interactive columns. Users and exam evaluators can click any card to instantly load the test string and execute the validator.

![Interactive Sample Test Suite](Images/Screenshot%202026-10-29%20224002.png)
*Figure 4.5: Sample test suite offering single-click test case loading for rapid viva demonstrations.*

---

## 5. Project Folder Structure

```
RegexLab/
│
├── index.html       # Semantic single-page web layout and SVG automata diagrams
├── style.css        # Pure black theme design tokens, layouts, and animations
├── script.js        # Rule configuration, validation logic, diagnostics & tracer
├── Images/          # Application screenshots and handwritten academic coursework diagrams
└── README.md        # Comprehensive technical & academic documentation
```

---

## 6. Instructions to Run the Application

Because RegexLab relies solely on standard browser technologies:

1. Clone or download the repository folder to your local machine.
2. Locate the `index.html` file in the project folder.
3. Open `index.html` in any modern web browser:
   - **Google Chrome** / **Microsoft Edge** / **Mozilla Firefox** / **Brave** / **Safari**
   - Alternatively, double-click `index.html` or drag it into an open browser window.
4. No web server, `npm install`, or internet connection is required.

---

## 7. Explanation of the Five Regex Patterns

The application implements five industry-standard input validation patterns using anchored expressions (`^...$`) to enforce full-string matching:

### Rule 1: Username Validation
- **Pattern:** `^[A-Za-z][A-Za-z0-9_]{3,14}$`
- **Breakdown:**
  - `^`: Asserts start of the input string.
  - `[A-Za-z]`: First character must strictly be an English letter (uppercase or lowercase). Prevents usernames from starting with digits or underscores.
  - `[A-Za-z0-9_]{3,14}`: Subsequent characters can contain letters, numbers, or underscores, with a quantity between 3 and 14. Combined with the initial character, total length is $1 + [3..14] = 4\text{ to }15$ characters.
  - `$`: Asserts end of the input string.

### Rule 2: Email Validation
- **Pattern:** `^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$`
- **Breakdown:**
  - `^`: Asserts start of the input.
  - `[A-Za-z0-9._%+-]+`: Matches one or more allowed characters in the mailbox/local part.
  - `@`: Mandatory literal `@` separator.
  - `[A-Za-z0-9.-]+`: Domain name host consisting of alphanumeric characters, hyphens, and dots.
  - `\.`: Escaped dot separating domain host from top-level domain (TLD).
  - `[A-Za-z]{2,}`: Top-level domain consisting of 2 or more alphabetic characters (e.g., `com`, `org`, `in`, `edu`).
  - `$`: Asserts end of the input.

### Rule 3: Strong Password Validation
- **Pattern:** `^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$`
- **Breakdown:**
  - `^`: Asserts start of string.
  - `(?=.*[a-z])`: Positive lookahead assertion. Scans forward from the beginning to confirm at least one lowercase letter exists without consuming any characters.
  - `(?=.*[A-Z])`: Positive lookahead assertion confirming at least one uppercase letter exists.
  - `(?=.*\d)`: Positive lookahead assertion confirming at least one decimal digit exists (`\d` $\equiv$ `[0-9]`).
  - `(?=.*[@$!%*?&])`: Positive lookahead assertion confirming at least one symbol from the set `{@, $, !, %, *, ?, &}` exists.
  - `[A-Za-z\d@$!%*?&]{8,}`: Matches 8 or more characters drawn strictly from the permitted alphabet.
  - `$`: Asserts end of string.

### Rule 4: Password With At Least One Digit
- **Pattern:** `^(?=.*\d)[A-Za-z\d]{6,12}$`
- **Breakdown:**
  - `^`: Asserts start of input.
  - `(?=.*\d)`: Positive lookahead assertion ensuring the presence of at least one digit.
  - `[A-Za-z\d]{6,12}`: Quantified character class requiring between 6 and 12 alphanumeric characters. Disallows spaces and special symbols.
  - `$`: Asserts end of input.

### Rule 5: Password Length and Allowed Characters
- **Pattern:** `^[A-Za-z0-9@#$%&*!]{8,16}$`
- **Breakdown:**
  - `^`: Asserts start of input.
  - `[A-Za-z0-9@#$%&*!]`: Explicit character class allowing letters, numbers, and seven designated special symbols (`@, #, $, %, &, *, !`).
  - `{8,16}`: Bounded length quantifier enforcing between 8 and 16 characters.
  - `$`: Asserts end of input.

---

## 8. Sample Test Cases

Every rule has been verified against the test cases below:

| Validation Rule | Valid Examples (Pass) | Invalid Examples (Fail) | Reason for Failure |
| :--- | :--- | :--- | :--- |
| **1. Username** | `sujal123`, `Student_1`, `Rahul2026`, `user_name`, `Abcd1234` | `abc`<br>`1student`<br>`user-name`<br>`user name`<br>`student@123` | Too short (3 chars)<br>Starts with digit<br>Contains hyphen<br>Contains space<br>Disallowed `@` symbol |
| **2. Email** | `sujal@gmail.com`, `student123@yahoo.com`, `rahul.patil@outlook.com`, `user_01@example.in`, `test+college@example.org` | `sujalgmail.com`<br>`sujal@`<br>`@gmail.com`<br>`student@gmail`<br>`user name@gmail.com` | Missing `@`<br>Missing domain<br>Missing local part<br>Missing TLD dot extension<br>Contains space |
| **3. Strong Password** | `Sujal@123`, `Hello@123`, `Student@1`, `PassWord@9`, `Secure$2026` | `sujal@123`<br>`SUJAL@123`<br>`Sujal@abc`<br>`Sujal123`<br>`Ab@1` | Missing uppercase<br>Missing lowercase<br>Missing digit<br>Missing special symbol<br>Too short (4 chars) |
| **4. Password with Digit** | `sujal12`, `abc123`, `Pass2026`, `Hello9`, `Student1` | `sujal`<br>`abcdef`<br>`12345`<br>`abc@123`<br>`Abcdefghijklm1` | Missing digit & short<br>Missing digit<br>Too short (5 chars)<br>Disallowed symbol `@`<br>Too long (14 chars) |
| **5. Password Length & Allowed** | `Sujal@123`, `Abcdef12`, `Password!`, `User@2026`, `Hello#123` | `Ab@123`<br>`abcdefghijklmnopq`<br>`Pass word1`<br>`abc/12345`<br>`Hello_123` | Too short (6 chars)<br>Too long (17 chars)<br>Contains space<br>Disallowed slash `/`<br>Disallowed underscore `_` |

*Note on Rule 5 test case:* The invalid string `abcdefghijklmnopq` contains 17 characters ($a$ through $q$), successfully violating the 16-character maximum constraint.

---

## 9. Connection to NFA, DFA, and Minimization

### Theoretical Case Study: $a(b \mid c)$

To provide an exact mathematical demonstration, the application models the regular expression:
$$r = a(b \mid c)$$
- **Alphabet:** $\Sigma = \{a, b, c\}$
- **Language:** $L(r) = \{ab, ac\}$

#### Why is $L$ a Regular Language?
1. The language is finite ($|L| = 2$). Every finite language is regular because it is a finite union of single-string regular languages.
2. It can be constructed using only the primitive operations of regular expressions (concatenation of $a$ with the union of $b$ and $c$).
3. It can be recognized by a Finite Automaton with a finite set of states and no external memory (stack or tape).

---

### Step 1: Thompson's NFA Construction
Thompson's algorithm transforms a regular expression into an equivalent NFA with $\epsilon$-transitions inductively:
1. Construct base automaton for $a$: $q_0 \xrightarrow{a} q_1$.
2. Construct base automata for $b$ ($q_3 \xrightarrow{b} q_4$) and $c$ ($q_5 \xrightarrow{c} q_6$).
3. Form union $(b \mid c)$: Introduce split state $q_2$ with transitions $q_2 \xrightarrow{\epsilon} q_3$ and $q_2 \xrightarrow{\epsilon} q_5$, and join their accept states into $q_7$ via $q_4 \xrightarrow{\epsilon} q_7$ and $q_6 \xrightarrow{\epsilon} q_7$.
4. Connect concatenation: $q_1 \xrightarrow{\epsilon} q_2$.
- **NFA States:** $Q_{NFA} = \{q_0, q_1, q_2, q_3, q_4, q_5, q_6, q_7\}$, Start State: $q_0$, Accepting State: $F = \{q_7\}$.

#### Application Vector Representation:
![Thompson's NFA UI & Table](Images/Screenshot%202026-10-29%20224108.png)
*Figure 9.1: Application SVG rendering of Thompson's NFA alongside its formal $\epsilon$-transition table.*

#### Coursework Handwritten Derivation:
In student coursework, Thompson's construction is derived step-by-step from base regular sub-expressions, introducing $\epsilon$-transitions to preserve compositionality:

![Handwritten Thompson's Construction](Images/Screenshot%202026-10-29%20234551.png)
*Figure 9.2: Coursework handwritten derivation of Thompson's NFA for $r = a(b \mid c)$ with start state $q_0$, concatenation state $q_1$, union branches, and final accepting state $q_6$.*

---

### Step 2: Subset Construction (NFA to DFA)
Subset construction simulates all possible parallel paths of an NFA by grouping reachable states under $\epsilon$-closures:

1. **Initial DFA State $A$:**
   $$\epsilon\text{-closure}(q_0) = \{q_0\} = A$$
2. **Transitions from $A$:**
   - On $'a'$: $\delta(q_0, a) = \{q_1\}$. $\epsilon\text{-closure}(\{q_1\}) = \{q_1, q_2, q_3, q_5\} = B$.
   - On $'b'$ or $'c'$: No transitions $\to$ Dead/Trap state $T$.
3. **Transitions from $B = \{q_1, q_2, q_3, q_5\}$:**
   - On $'a'$: No transition $\to T$.
   - On $'b'$: $\delta(q_3, b) = \{q_4\}$. $\epsilon\text{-closure}(\{q_4\}) = \{q_4, q_7\} = C$ (Accepting, since $q_7 \in C$).
   - On $'c'$: $\delta(q_5, c) = \{q_6\}$. $\epsilon\text{-closure}(\{q_6\}) = \{q_6, q_7\} = D$ (Accepting, since $q_7 \in D$).
4. **Transitions from $C$ and $D$:**
   - On any symbol in $\{a, b, c\}$, no further transitions exist $\to T$.
5. **Dead/Trap State $T$:**
   - For any symbol in $\{a, b, c\}$, $\delta(T, x) = T$ (self-loop).

#### DFA Transition Table:
| DFA State | NFA Subset | on 'a' | on 'b' | on 'c' | Status |
| :---: | :---: | :---: | :---: | :---: | :---: |
| $\to A$ | $\{q_0\}$ | $B$ | $T$ | $T$ | Start |
| $B$ | $\{q_1, q_2, q_3, q_5\}$ | $T$ | $C$ | $D$ | Non-accepting |
| $* C$ | $\{q_4, q_7\}$ | $T$ | $T$ | $T$ | Accepting ($ab$) |
| $* D$ | $\{q_6, q_7\}$ | $T$ | $T$ | $T$ | Accepting ($ac$) |
| $T$ | $\emptyset$ | $T$ | $T$ | $T$ | Dead/Trap |

#### Digital Application Views:
![Subset Construction Table & Diagram](Images/Screenshot%202026-10-29%20224119.png)
*Figure 9.3: Subset construction interactive panel in RegexLab displaying the $\epsilon$-closure mappings and converted DFA diagram.*

![Close-up DFA Transition Table](Images/Screenshot%202026-10-29%20235430.png)
*Figure 9.4: Detailed view of the DFA subset transition table specifying start, intermediate, accepting, and dead states.*

![DFA State Machine Diagram](Images/Screenshot%202026-10-29%20235512.png)
*Figure 9.5: Clean vector diagram of the converted DFA showing transitions on alphabet $\Sigma = \{a, b, c\}$ with trap state $T$.*

#### High-Resolution Classical DFA Model:
![Classical DFA Diagram with Dead State](Images/Screenshot%202026-10-29%20235621.png)
*Figure 9.6: Formal 5-state Deterministic Finite Automaton with start state $q_0$, intermediate prefix state $q_1$, accepting states $q_2$ (for $ab$) and $q_3$ (for $ac$), and explicit sink state $q_d$.*

#### Student Coursework Handwritten Proofs:
The student's classroom derivation rigorously details the direct DFA and its transition table over $\Sigma = \{a, b, c\}$:

![Direct State Sketch](Images/Screenshot%202026-10-29%20235022.png)
*Figure 9.7: Preliminary transition sketch mapping out initial prefix $a$ and branch completions on $b$ and $c$.*

![Handwritten Complete DFA with Dead State](Images/Screenshot%202026-10-29%20235859.png)
*Figure 9.8: Complete handwritten DFA diagram explicitly routing all invalid symbols ($b, c$ from $q_0$; $a$ from $q_1$; and all symbols from $q_2, q_3$) into trap state $q_4$.*

![Handwritten DFA Transition Table](Images/Screenshot%202026-10-30%20000041.png)
*Figure 9.9: Handwritten DFA transition table verifying total determinism across all five states $\{q_0, q_1, q_2, q_3, q_4\}$.*

---

### Step 3: DFA Minimization (Hopcroft State Equivalence Partitioning)

1. **Initial Partition ($P_0$):**
   Separate states into non-accepting and accepting sets:
   $$P_0 = \{ \{A, B, T\}, \{C, D\} \}$$
2. **Evaluating Non-Accepting Set $\{A, B, T\}$:**
   - On symbol $'b'$: State $B \to C$ (Accepting set), whereas $A \to T$ and $T \to T$ (Non-accepting set).
   - Thus, State $B$ is distinguished from $\{A, T\}$.
   - On symbol $'a'$: State $A \to B$, while $T \to T$. State $A$ is distinguished from $T$.
   - Resulting partition: $\{A\}, \{B\}, \{T\}$.
3. **Evaluating Accepting Set $\{C, D\}$:**
   - On $'a'$: $\delta(C, a) = T$ and $\delta(D, a) = T$.
   - On $'b'$: $\delta(C, b) = T$ and $\delta(D, b) = T$.
   - On $'c'$: $\delta(C, c) = T$ and $\delta(D, c) = T$.
   - Both states $C$ and $D$ transition to the identical state $T$ for every symbol in $\Sigma$.
   - Therefore, $C$ and $D$ are **indistinguishable** ($C \equiv D$) and can be merged into a single state $CD$.

#### Minimized DFA State Machine:
- **States:** $Q_{min} = \{A, B, CD, T\}$
- **Start State:** $A$
- **Accepting State:** $CD$
- **Transitions:**
  $$\delta(A, a) = B, \quad \delta(A, \{b, c\}) = T$$
  $$\delta(B, \{b, c\}) = CD, \quad \delta(B, a) = T$$
  $$\delta(CD, \{a, b, c\}) = T$$
  $$\delta(T, \{a, b, c\}) = T$$

#### Digital Minimization Panel in RegexLab:
![DFA Minimization UI & Diagram](Images/Screenshot%202026-10-29%20224139.png)
*Figure 9.10: RegexLab minimization panel showing the merged state $CD$, simplified transitions, and equivalence verification.*

#### Student Coursework Handwritten Minimization Derivation:
In student class notes, the partitioning algorithm is calculated across $0$-equivalence, $1$-equivalence, and $2$-equivalence:
- $0\text{-Equivalence: } \{q_0, q_1, q_4\}, \{q_2, q_3\}$
- $1\text{-Equivalence: } \{q_0, q_4\}, \{q_1\}, \{q_2, q_3\}$
- $2\text{-Equivalence: } \{q_0\} \to A,\; \{q_4\} \to B,\; \{q_1\} \to C,\; \{q_2, q_3\} \to D$

This proves that states $q_2$ and $q_3$ are equivalent and merge into a single accepting state $D$, producing the minimal 4-state DFA:

![Handwritten DFA Minimization](Images/Screenshot%202026-10-30%20000224.png)
*Figure 9.11: Handwritten state-equivalence partition derivation and resulting minimal DFA graph.*

---

## 10. Limitations of the Application

While RegexLab serves as an educational and technical demonstration, it is essential to understand its real-world engineering boundaries:

1. **Email Format Validation vs. Mailbox Existence:**
   - The email regular expression verifies syntactic conformity (local part, `@`, domain structure, and TLD format).
   - It **does not** prove that the domain exists, that MX (Mail Exchange) DNS records are configured, that the mail server is active, or that the specific mailbox account actually exists. True verification requires DNS MX lookups and SMTP handshake verification or double opt-in email dispatch.

2. **Password Pattern Constraints vs. Real Account Security:**
   - The password validation rules check structural characteristics (character sets, lengths, and lookahead presence).
   - It **does not** query HaveIBeenPwned or breached credential databases. A password like `Password@123` satisfies all "Strong Password" rules syntactically but is among the most commonly breached passwords in the world.
   - Production authentication systems require server-side salted cryptographic hashing (e.g., Argon2id, bcrypt), brute-force rate limiting, and multi-factor authentication (MFA).

3. **Theoretical Regular Expressions vs. Modern Regex Engines:**
   - Pure regular expressions correspond strictly to Finite Automata and cannot count arbitrarily or perform backreferencing.
   - Modern engines (such as JavaScript's RegExp) support features like zero-width lookaheads (`(?=...)`), non-greedy quantifiers, and backreferences (`\1`), which extend expressiveness beyond pure Type 3 regular grammars.

---

## 11. Conclusion

**RegexLab** demonstrates the foundational role of the Theory of Computation in day-to-day software engineering. By tracing the mathematical progression from formal regular expressions to NFAs, DFAs, and state minimization, the project demystifies client-side input validation and proves how theoretical computer science enables predictable, secure, and linear-time software systems.

---

## 12. Student Attribution & Metadata

- **Project Title:** RegexLab: Email, Password & Username Validation
- **Academic Subject:** Theory of Computation (TOC)
- **Application Area:** Email & Password Validation
- **Student Name:** [Your Name]
- **Roll Number:** 2
- **Department:** Computer Engineering
- **Institution:** [Your College Name]
- **Academic Year:** 2026
