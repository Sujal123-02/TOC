/**
 * RegexLab - Educational Regular Expression & Finite Automata Laboratory
 * Course: Theory of Computation (TOC)
 * Vanilla JavaScript Implementation
 */

// Strict mode for cleaner code and safety
'use strict';

/* ==========================================================================
   1. REGEX CONFIGURATION OBJECT
   Centralized rule definitions, regex patterns, explanations, and test cases
   ========================================================================== */

const VALIDATION_RULES = {
  username: {
    id: 'username',
    name: 'Username Validation',
    regex: /^[A-Za-z][A-Za-z0-9_]{3,14}$/,
    regexStr: '^[A-Za-z][A-Za-z0-9_]{3,14}$',
    placeholder: 'Example: sujal123 or Student_1',
    description: 'Validates standard user account handles with length and character constraints.',
    requirements: [
      'Must begin with an English letter (A-Z or a-z).',
      'Remaining characters can only contain English letters, digits, and underscores (_).',
      'Total length must be between 4 and 15 characters.'
    ],
    breakdown: [
      { token: '^', meaning: 'Beginning of input anchor: asserts that matching begins at the very first character.' },
      { token: '[A-Za-z]', meaning: 'Character class matching exactly one English letter (uppercase or lowercase) as the first character.' },
      { token: '[A-Za-z0-9_]', meaning: 'Allowed character class for remaining positions: letters, digits, or underscore.' },
      { token: '{3,14}', meaning: 'Range quantifier: requires between 3 and 14 occurrences of the preceding character class (yielding 4 to 15 total characters).' },
      { token: '$', meaning: 'End of input anchor: ensures matching continues until the very last character with no trailing characters.' }
    ],
    validExamples: [
      { input: 'sujal123', note: '8 characters, starts with lowercase "s", letters & digits.' },
      { input: 'Student_1', note: '9 characters, starts with uppercase "S", contains valid underscore.' },
      { input: 'Rahul2026', note: '9 characters, starts with uppercase "R", valid letters & numbers.' },
      { input: 'user_name', note: '9 characters, starts with lowercase "u", contains valid underscore.' },
      { input: 'Abcd1234', note: '8 characters, starts with uppercase "A", valid alphanumeric.' }
    ],
    invalidExamples: [
      { input: 'abc', note: 'Rejected: Total length is 3 characters (minimum is 4).' },
      { input: '1student', note: 'Rejected: Starts with digit "1" instead of an English letter.' },
      { input: 'user-name', note: 'Rejected: Contains hyphen "-", which is not permitted.' },
      { input: 'user name', note: 'Rejected: Contains space, which is not permitted.' },
      { input: 'student@123', note: 'Rejected: Contains "@", only underscores are allowed as special characters.' }
    ],
    diagnose(input) {
      const issues = [];
      if (input.length < 4 || input.length > 15) {
        issues.push(`Length requirement violated: Total length is ${input.length} characters (must be between 4 and 15 characters).`);
      }
      if (!/^[A-Za-z]/.test(input)) {
        issues.push('Initial character requirement violated: The username must begin with an English letter (A-Z or a-z).');
      }
      if (/[^A-Za-z0-9_]/.test(input)) {
        const illegalChars = Array.from(new Set(input.match(/[^A-Za-z0-9_]/g))).map(c => c === ' ' ? 'space' : `"${c}"`).join(', ');
        issues.push(`Disallowed character(s) detected: ${illegalChars}. Only English letters, digits, and underscores are allowed.`);
      }
      return issues;
    }
  },

  email: {
    id: 'email',
    name: 'Email Validation',
    regex: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
    regexStr: '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$',
    placeholder: 'Example: sujal@gmail.com',
    description: 'Educational email format validation verifying local part, @ delimiter, and top-level domain structure.',
    requirements: [
      'The local part before "@" must contain alphanumeric characters or allowed symbols (._%+-) with no spaces.',
      'An "@" symbol must separate the local mailbox and the domain.',
      'The domain name after "@" must contain valid domain labels separated by dots.',
      'The top-level domain (TLD) must have a dot followed by at least two English letters.'
    ],
    breakdown: [
      { token: '^', meaning: 'Beginning of input anchor: asserts matching begins at the start of the string.' },
      { token: '[A-Za-z0-9._%+-]+', meaning: 'Local part: one or more letters, digits, dots, underscores, percents, pluses, or hyphens.' },
      { token: '@', meaning: 'Mandatory literal "@" delimiter separating local part from domain name.' },
      { token: '[A-Za-z0-9.-]+', meaning: 'Domain host name: one or more letters, digits, dots, or hyphens.' },
      { token: '\\.', meaning: 'Escaped dot character separating domain host from top-level domain (TLD).' },
      { token: '[A-Za-z]{2,}', meaning: 'Top-level domain: at least two English letters (e.g., com, org, in, edu).' },
      { token: '$', meaning: 'End of input anchor: guarantees the full string adheres to the pattern.' }
    ],
    validExamples: [
      { input: 'sujal@gmail.com', note: 'Standard commercial email format with valid domain.' },
      { input: 'student123@yahoo.com', note: 'Alphanumeric local part with standard top-level domain.' },
      { input: 'rahul.patil@outlook.com', note: 'Dotted local part with valid outlook host and com TLD.' },
      { input: 'user_01@example.in', note: 'Local part with underscore and country-code TLD (.in).' },
      { input: 'test+college@example.org', note: 'Valid tag-addressed local part with plus sign (+) and .org TLD.' }
    ],
    invalidExamples: [
      { input: 'sujalgmail.com', note: 'Rejected: Missing mandatory "@" separator.' },
      { input: 'sujal@', note: 'Rejected: Domain name after "@" is completely missing.' },
      { input: '@gmail.com', note: 'Rejected: Local part before "@" is missing.' },
      { input: 'student@gmail', note: 'Rejected: Missing dot and top-level domain (TLD).' },
      { input: 'user name@gmail.com', note: 'Rejected: Spaces are not permitted in email addresses.' }
    ],
    diagnose(input) {
      const issues = [];
      if (input.includes(' ')) {
        issues.push('Disallowed space detected: Email addresses cannot contain spaces.');
      }
      if (!input.includes('@')) {
        issues.push('Missing delimiter: An "@" symbol must separate the local part and domain.');
        return issues;
      }
      const atParts = input.split('@');
      if (atParts.length > 2) {
        issues.push('Multiple "@" symbols detected: An email must contain exactly one "@" separator.');
        return issues;
      }
      const [local, domain] = atParts;
      if (!local || local.length === 0) {
        issues.push('Empty local part: The mailbox name before "@" cannot be empty.');
      } else if (!/^[A-Za-z0-9._%+-]+$/.test(local)) {
        issues.push('Invalid characters in local part: Only letters, numbers, and ._%+- are permitted before "@".');
      }

      if (!domain || domain.length === 0) {
        issues.push('Empty domain: The domain name after "@" cannot be empty.');
      } else {
        if (!domain.includes('.')) {
          issues.push('Missing domain extension: Domain must contain a dot followed by a top-level domain (e.g., .com).');
        } else {
          const domainSegments = domain.split('.');
          const tld = domainSegments[domainSegments.length - 1];
          if (!/^[A-Za-z]{2,}$/.test(tld)) {
            issues.push(`Invalid top-level domain (TLD): The extension after the final dot ("${tld}") must consist of at least 2 English letters.`);
          }
          if (domainSegments.slice(0, -1).some(s => s.length === 0 || !/^[A-Za-z0-9.-]+$/.test(s))) {
            issues.push('Invalid domain host: Host labels before the TLD contain invalid characters or consecutive dots.');
          }
        }
      }
      if (issues.length === 0) {
        issues.push('Enter an email in the required format (e.g., username@domain.com).');
      }
      return issues;
    }
  },

  strong_password: {
    id: 'strong_password',
    name: 'Strong Password Validation',
    regex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    regexStr: '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$',
    placeholder: 'Example: Sujal@123 or Secure$2026',
    description: 'Enforces robust security policy with positive lookaheads for letter cases, numbers, and symbols.',
    requirements: [
      'At least one lowercase English letter (a-z).',
      'At least one uppercase English letter (A-Z).',
      'At least one decimal digit (0-9).',
      'At least one permitted special character (@, $, !, %, *, ?, &).',
      'Minimum length of 8 characters overall.',
      'Only letters, digits, and the specified special characters are permitted (no spaces).'
    ],
    breakdown: [
      { token: '^', meaning: 'Beginning of input anchor: asserts start of password string.' },
      { token: '(?=.*[a-z])', meaning: 'Positive lookahead: asserts presence of at least one lowercase letter anywhere in input without consuming characters.' },
      { token: '(?=.*[A-Z])', meaning: 'Positive lookahead: asserts presence of at least one uppercase letter anywhere in input.' },
      { token: '(?=.*\\d)', meaning: 'Positive lookahead: asserts presence of at least one digit (\\d matches [0-9]).' },
      { token: '(?=.*[@$!%*?&])', meaning: 'Positive lookahead: asserts presence of at least one permitted special character from set {@, $, !, %, *, ?, &}.' },
      { token: '.*', meaning: 'Inside each lookahead, matches any sequence of characters to scan ahead through the entire string.' },
      { token: '[A-Za-z\\d@$!%*?&]{8,}', meaning: 'Character set and quantifier: requires 8 or more characters strictly drawn from permitted sets.' },
      { token: '$', meaning: 'End of input anchor: ensures no disallowed trailing characters exist.' }
    ],
    validExamples: [
      { input: 'Sujal@123', note: '9 chars: uppercase "S", lowercase, digit "123", special "@".' },
      { input: 'Hello@123', note: '9 chars: uppercase "H", lowercase, digits, special "@".' },
      { input: 'Student@1', note: '9 chars: uppercase "S", lowercase, digit "1", special "@".' },
      { input: 'PassWord@9', note: '10 chars: multiple uppercase letters, lowercase, digit, special "@".' },
      { input: 'Secure$2026', note: '11 chars: uppercase "S", lowercase, digits, special "$".' }
    ],
    invalidExamples: [
      { input: 'sujal@123', note: 'Rejected: Missing uppercase English letter.' },
      { input: 'SUJAL@123', note: 'Rejected: Missing lowercase English letter.' },
      { input: 'Sujal@abc', note: 'Rejected: Missing at least one decimal digit.' },
      { input: 'Sujal123', note: 'Rejected: Missing permitted special character (@, $, !, %, *, ?, &).' },
      { input: 'Ab@1', note: 'Rejected: Length is only 4 characters (minimum required is 8).' }
    ],
    diagnose(input) {
      const issues = [];
      if (input.length < 8) {
        issues.push(`Length requirement violated: Password must contain at least 8 characters (currently ${input.length}).`);
      }
      if (!/(?=.*[a-z])/.test(input)) {
        issues.push('Password must contain at least one lowercase letter (a-z).');
      }
      if (!/(?=.*[A-Z])/.test(input)) {
        issues.push('Password must contain at least one uppercase letter (A-Z).');
      }
      if (!/(?=.*\d)/.test(input)) {
        issues.push('Password must contain at least one digit (0-9).');
      }
      if (!/(?=.*[@$!%*?&])/.test(input)) {
        issues.push('Password must contain at least one permitted special character (@, $, !, %, *, ?, &).');
      }
      if (/[^A-Za-z\d@$!%*?&]/.test(input)) {
        const illegalChars = Array.from(new Set(input.match(/[^A-Za-z\d@$!%*?&]/g))).map(c => c === ' ' ? 'space' : `"${c}"`).join(', ');
        issues.push(`Disallowed character(s) detected: ${illegalChars}. Only letters, digits, and @$!%*?& are permitted.`);
      }
      return issues;
    }
  },

  password_digit: {
    id: 'password_digit',
    name: 'Password With At Least One Digit',
    regex: /^(?=.*\d)[A-Za-z\d]{6,12}$/,
    regexStr: '^(?=.*\\d)[A-Za-z\\d]{6,12}$',
    placeholder: 'Example: sujal12 or abc123',
    description: 'Enforces alphanumeric passwords requiring a minimum of one numeric digit and 6-12 character length.',
    requirements: [
      'Must contain at least one digit (0-9).',
      'Only English letters (A-Z, a-z) and digits (0-9) are permitted.',
      'The length must be strictly between 6 and 12 characters.',
      'Spaces and special characters are not permitted.'
    ],
    breakdown: [
      { token: '^', meaning: 'Beginning of input anchor: asserts start of matching.' },
      { token: '(?=.*\\d)', meaning: 'Positive lookahead assertion: scans ahead to confirm at least one digit (0-9) is present.' },
      { token: '[A-Za-z\\d]{6,12}', meaning: 'Alphanumeric character class and quantifier: requires between 6 and 12 letters and digits.' },
      { token: '$', meaning: 'End of input anchor: asserts no trailing characters exist.' }
    ],
    validExamples: [
      { input: 'sujal12', note: '7 characters, letters with digits "12".' },
      { input: 'abc123', note: '6 characters (exact minimum), letters and digits.' },
      { input: 'Pass2026', note: '8 characters, mixed case letters with digits.' },
      { input: 'Hello9', note: '6 characters, letters with digit "9".' },
      { input: 'Student1', note: '8 characters, letters with digit "1".' }
    ],
    invalidExamples: [
      { input: 'sujal', note: 'Rejected: Length is 5 characters (min 6) and contains no digit.' },
      { input: 'abcdef', note: 'Rejected: Length is valid (6) but contains no numeric digit.' },
      { input: '12345', note: 'Rejected: Contains digits but length is only 5 characters (min 6).' },
      { input: 'abc@123', note: 'Rejected: Special character "@" is not permitted (alphanumeric only).' },
      { input: 'Abcdefghijklm1', note: 'Rejected: Length is 14 characters, exceeding maximum limit of 12.' }
    ],
    diagnose(input) {
      const issues = [];
      if (input.length < 6 || input.length > 12) {
        issues.push(`Length requirement violated: Length must be between 6 and 12 characters (currently ${input.length}).`);
      }
      if (!/(?=.*\d)/.test(input)) {
        issues.push('Password must contain at least one digit (0-9).');
      }
      if (/[^A-Za-z\d]/.test(input)) {
        const illegalChars = Array.from(new Set(input.match(/[^A-Za-z\d]/g))).map(c => c === ' ' ? 'space' : `"${c}"`).join(', ');
        issues.push(`Disallowed character(s) detected: ${illegalChars}. Only English letters and numbers are permitted.`);
      }
      return issues;
    }
  },

  password_length: {
    id: 'password_length',
    name: 'Password Length and Allowed Characters',
    regex: /^[A-Za-z0-9@#$%&*!]{8,16}$/,
    regexStr: '^[A-Za-z0-9@#$%&*!]{8,16}$',
    placeholder: 'Example: Sujal@123 or Password!',
    description: 'Validates bounded passwords containing letters, numbers, and an explicit set of 7 special symbols.',
    requirements: [
      'The length must be between 8 and 16 characters.',
      'English letters (A-Z, a-z) and digits (0-9) are allowed.',
      'Only the following 7 special characters are allowed: @, #, $, %, &, *, and !.',
      'Spaces, underscores, slashes, and other special characters are not permitted.'
    ],
    breakdown: [
      { token: '^', meaning: 'Beginning of input anchor: asserts start of matching.' },
      { token: '[A-Za-z0-9@#$%&*!]', meaning: 'Permitted character class: alphanumeric letters, numbers, and 7 specific punctuation symbols.' },
      { token: '{8,16}', meaning: 'Range quantifier: strictly requires between 8 and 16 characters.' },
      { token: '$', meaning: 'End of input anchor: ensures the entire string is validated.' }
    ],
    validExamples: [
      { input: 'Sujal@123', note: '9 characters, letters, digits, allowed "@" symbol.' },
      { input: 'Abcdef12', note: '8 characters (exact minimum), letters and digits.' },
      { input: 'Password!', note: '9 characters, letters and allowed "!" exclamation mark.' },
      { input: 'User@2026', note: '9 characters, letters, allowed "@" symbol, digits.' },
      { input: 'Hello#123', note: '9 characters, letters, allowed "#" hash symbol, digits.' }
    ],
    invalidExamples: [
      { input: 'Ab@123', note: 'Rejected: Length is only 6 characters (minimum requirement is 8).' },
      { input: 'abcdefghijklmnopq', note: 'Rejected: Length is 17 characters (exceeds maximum allowed length of 16).' },
      { input: 'Pass word1', note: 'Rejected: Disallowed space character in password.' },
      { input: 'abc/12345', note: 'Rejected: Disallowed slash "/" character (not in permitted symbol set).' },
      { input: 'Hello_123', note: 'Rejected: Disallowed underscore "_" character (only @#$%&*! permitted).' }
    ],
    diagnose(input) {
      const issues = [];
      if (input.length < 8 || input.length > 16) {
        issues.push(`Password must contain between 8 and 16 permitted characters (currently ${input.length}).`);
      }
      if (/[^A-Za-z0-9@#$%&*!]/.test(input)) {
        const illegalChars = Array.from(new Set(input.match(/[^A-Za-z0-9@#$%&*!]/g))).map(c => c === ' ' ? 'space' : `"${c}"`).join(', ');
        issues.push(`Disallowed character(s) detected: ${illegalChars}. Only letters, numbers, and @, #, $, %, &, *, ! are permitted.`);
      }
      return issues;
    }
  }
};

/* ==========================================================================
   2. DOM ELEMENT REFERENCES
   ========================================================================== */

const ruleSelect = document.getElementById('ruleSelect');
const inputField = document.getElementById('testInput');
const btnValidate = document.getElementById('btnValidate');
const btnClear = document.getElementById('btnClear');

const activeRuleName = document.getElementById('activeRuleName');
const activeRuleRegex = document.getElementById('activeRuleRegex');
const activeRuleDesc = document.getElementById('activeRuleDesc');

const resultContainer = document.getElementById('resultContainer');
const resultPanel = document.getElementById('resultPanel');
const resultBadge = document.getElementById('resultBadge');
const resultHeadline = document.getElementById('resultHeadline');
const resultRuleName = document.getElementById('resultRuleName');
const resultRegexUsed = document.getElementById('resultRegexUsed');
const resultFeedbackList = document.getElementById('resultFeedbackList');

const breakdownPatternCode = document.getElementById('breakdownPatternCode');
const breakdownTableBody = document.getElementById('breakdownTableBody');

const validExamplesContainer = document.getElementById('validExamplesContainer');
const invalidExamplesContainer = document.getElementById('invalidExamplesContainer');
const libraryGrid = document.getElementById('libraryGrid');

// Automata String Tracer Elements
const automataInput = document.getElementById('automataInput');
const btnTraceAutomata = document.getElementById('btnTraceAutomata');
const automataTraceResult = document.getElementById('automataTraceResult');

/* ==========================================================================
   3. INITIALIZATION & POPULATION
   ========================================================================== */

function initApp() {
  populateRuleSelector();
  renderRegexLibrary();
  
  // Set default rule to username
  const initialRule = 'username';
  ruleSelect.value = initialRule;
  updateSelectedRuleUI(initialRule);

  // Setup event listeners
  setupEventListeners();

  // Setup quick tester pills in automata theory
  setupAutomataQuickPills();
}

/**
 * Populates the dropdown selector with the 5 predefined rules
 */
function populateRuleSelector() {
  ruleSelect.innerHTML = '';
  Object.values(VALIDATION_RULES).forEach(rule => {
    const option = document.createElement('option');
    option.value = rule.id;
    option.textContent = rule.name;
    ruleSelect.appendChild(option);
  });
}

/**
 * Updates UI cards, explanations, and test cases when the selected rule changes
 */
function updateSelectedRuleUI(ruleId) {
  const rule = VALIDATION_RULES[ruleId];
  if (!rule) return;

  // Update input placeholder
  inputField.placeholder = rule.placeholder;

  // Update Active Rule Banner
  activeRuleName.textContent = rule.name;
  activeRuleRegex.textContent = rule.regexStr;
  activeRuleDesc.textContent = rule.description;

  // Update Explanation Breakdown Table
  renderExplanation(rule);

  // Update Sample Cases for this rule
  renderSampleCases(rule);

  // Reset any previous validation output
  hideResultPanel();
}

/**
 * Renders the breakdown table for the selected regular expression
 */
function renderExplanation(rule) {
  breakdownPatternCode.textContent = rule.regexStr;
  breakdownTableBody.innerHTML = '';

  rule.breakdown.forEach(item => {
    const tr = document.createElement('tr');

    const tdToken = document.createElement('td');
    tdToken.className = 'token-cell';
    tdToken.textContent = item.token;

    const tdMeaning = document.createElement('td');
    tdMeaning.className = 'meaning-cell';
    tdMeaning.textContent = item.meaning;

    tr.appendChild(tdToken);
    tr.appendChild(tdMeaning);
    breakdownTableBody.appendChild(tr);
  });
}

/**
 * Renders the 5 valid and 5 invalid test case buttons for the active rule
 */
function renderSampleCases(rule) {
  // Clear containers
  validExamplesContainer.innerHTML = '';
  invalidExamplesContainer.innerHTML = '';

  // Render valid examples
  rule.validExamples.forEach(ex => {
    const btn = createExampleButton(ex.input, ex.note, true, rule.id);
    validExamplesContainer.appendChild(btn);
  });

  // Render invalid examples
  rule.invalidExamples.forEach(ex => {
    const btn = createExampleButton(ex.input, ex.note, false, rule.id);
    invalidExamplesContainer.appendChild(btn);
  });
}

/**
 * Factory for creating accessible sample test case cards
 */
function createExampleButton(inputValue, note, isValid, ruleId) {
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'example-btn';
  button.setAttribute('aria-label', `Load test case: ${inputValue}`);

  const rowTop = document.createElement('div');
  rowTop.className = 'example-row-top';

  const valSpan = document.createElement('span');
  valSpan.className = 'example-value';
  valSpan.textContent = inputValue;

  const tagSpan = document.createElement('span');
  tagSpan.className = `example-tag ${isValid ? 'tag-valid' : 'tag-invalid'}`;
  tagSpan.textContent = isValid ? 'VALID TEST' : 'INVALID TEST';

  rowTop.appendChild(valSpan);
  rowTop.appendChild(tagSpan);

  const noteDiv = document.createElement('div');
  noteDiv.className = 'example-note';
  noteDiv.textContent = note;

  button.appendChild(rowTop);
  button.appendChild(noteDiv);

  // When clicked, load example into input and validate immediately
  button.addEventListener('click', () => {
    loadExample(inputValue, ruleId);
  });

  return button;
}

/**
 * Populates the Regex Library section with all 5 rules
 */
function renderRegexLibrary() {
  libraryGrid.innerHTML = '';

  Object.values(VALIDATION_RULES).forEach(rule => {
    const card = document.createElement('div');
    card.className = 'library-card';

    // Header
    const cardHeader = document.createElement('div');
    cardHeader.className = 'library-card-header';

    const title = document.createElement('h4');
    title.className = 'library-card-title';
    title.textContent = rule.name;

    cardHeader.appendChild(title);

    // Description
    const desc = document.createElement('p');
    desc.className = 'library-card-desc';
    desc.textContent = rule.description;

    // Regex code box with copy button
    const regexBox = document.createElement('div');
    regexBox.className = 'library-regex-box';

    const regexCode = document.createElement('code');
    regexCode.className = 'library-regex-text';
    regexCode.textContent = rule.regexStr;

    const copyBtn = document.createElement('button');
    copyBtn.type = 'button';
    copyBtn.className = 'btn-copy';
    copyBtn.textContent = 'Copy Regex';
    copyBtn.setAttribute('aria-label', `Copy ${rule.name} regular expression`);

    copyBtn.addEventListener('click', () => {
      copyRegex(rule.regexStr, copyBtn);
    });

    regexBox.appendChild(regexCode);
    regexBox.appendChild(copyBtn);

    // Requirements list
    const reqsDiv = document.createElement('div');
    reqsDiv.className = 'library-reqs';

    const reqsHeading = document.createElement('strong');
    reqsHeading.textContent = 'Key Requirements:';
    reqsDiv.appendChild(reqsHeading);

    const ul = document.createElement('ul');
    rule.requirements.forEach(req => {
      const li = document.createElement('li');
      li.textContent = req;
      ul.appendChild(li);
    });
    reqsDiv.appendChild(ul);

    // Assemble card
    card.appendChild(cardHeader);
    card.appendChild(desc);
    card.appendChild(regexBox);
    card.appendChild(reqsDiv);

    libraryGrid.appendChild(card);
  });
}

/* ==========================================================================
   4. VALIDATION & RESULT LOGIC
   ========================================================================== */

/**
 * Main validation execution function
 * Note: Spaces and special characters are preserved (no trim) to test exact matching
 */
function validateInput() {
  const rawInput = inputField.value;
  const currentRuleId = ruleSelect.value;
  const rule = VALIDATION_RULES[currentRuleId];

  if (!rule) return;

  // Requirement: Distinguish empty input from regular regex mismatch
  if (rawInput === '') {
    displayEmptyInputWarning();
    return;
  }

  // Execute full-string regex test
  const isMatch = rule.regex.test(rawInput);

  if (isMatch) {
    displayValidResult(rule, rawInput);
  } else {
    displayInvalidResult(rule, rawInput);
  }
}

/**
 * Handles empty input submissions with a distinct warning message
 */
function displayEmptyInputWarning() {
  resultPanel.className = 'result-panel status-warning';
  resultBadge.className = 'result-badge badge-warning';
  resultBadge.textContent = 'INPUT REQUIRED';

  resultHeadline.textContent = 'Please enter a value to validate.';
  resultRuleName.textContent = VALIDATION_RULES[ruleSelect.value].name;
  resultRegexUsed.textContent = VALIDATION_RULES[ruleSelect.value].regexStr;

  resultFeedbackList.innerHTML = '';
  const li = document.createElement('li');
  li.className = 'result-feedback-item';
  li.textContent = 'The input field is empty. Please enter a string, email address, username, or password to test against the selected rule.';
  resultFeedbackList.appendChild(li);

  showResultPanel();
}

/**
 * Handles valid input submissions
 */
function displayValidResult(rule, input) {
  resultPanel.className = 'result-panel status-valid';
  resultBadge.className = 'result-badge badge-valid';
  resultBadge.textContent = 'VALID INPUT';

  resultHeadline.textContent = 'The input matches the selected regular expression.';
  resultRuleName.textContent = rule.name;
  resultRegexUsed.textContent = rule.regexStr;

  resultFeedbackList.innerHTML = '';

  const criteria = [
    `Length check: Satisfied requirement with ${input.length} characters.`,
    'Character class check: All characters belong strictly to the permitted alphabet.',
    'Anchor boundaries: Successfully matched from beginning (^) to end ($) with no extraneous tokens.'
  ];

  criteria.forEach(text => {
    const li = document.createElement('li');
    li.className = 'result-feedback-item';
    li.textContent = text;
    resultFeedbackList.appendChild(li);
  });

  showResultPanel();
}

/**
 * Handles invalid input submissions with targeted diagnosis
 */
function displayInvalidResult(rule, input) {
  resultPanel.className = 'result-panel status-invalid';
  resultBadge.className = 'result-badge badge-invalid';
  resultBadge.textContent = 'INVALID INPUT';

  resultHeadline.textContent = 'The input does not match the selected regular expression.';
  resultRuleName.textContent = rule.name;
  resultRegexUsed.textContent = rule.regexStr;

  resultFeedbackList.innerHTML = '';

  // Obtain specific failure reasons from the rule's diagnostic analyzer
  const issues = rule.diagnose(input);

  if (issues.length > 0) {
    issues.forEach(issue => {
      const li = document.createElement('li');
      li.className = 'result-feedback-item';
      li.textContent = issue;
      resultFeedbackList.appendChild(li);
    });
  } else {
    const li = document.createElement('li');
    li.className = 'result-feedback-item';
    li.textContent = 'The input violates the required structural pattern.';
    resultFeedbackList.appendChild(li);
  }

  showResultPanel();
}

function showResultPanel() {
  resultContainer.style.display = 'block';
  // Scroll slightly to bring result into clear view if needed
  resultContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function hideResultPanel() {
  resultContainer.style.display = 'none';
  resultFeedbackList.innerHTML = '';
}

/**
 * Clears the input, resets styling, and returns focus
 */
function clearForm() {
  inputField.value = '';
  hideResultPanel();
  inputField.focus();
}

/**
 * Loads a sample example string and immediately triggers validation
 */
function loadExample(value, ruleId) {
  if (ruleSelect.value !== ruleId) {
    ruleSelect.value = ruleId;
    updateSelectedRuleUI(ruleId);
  }
  inputField.value = value;
  validateInput();
  inputField.focus();
}

/**
 * Copies regex pattern to clipboard with UI confirmation feedback
 */
function copyRegex(text, buttonElement) {
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(text).then(() => {
      showCopyConfirmation(buttonElement);
    }).catch(() => {
      fallbackCopyText(text, buttonElement);
    });
  } else {
    fallbackCopyText(text, buttonElement);
  }
}

function fallbackCopyText(text, buttonElement) {
  const textArea = document.createElement('textarea');
  textArea.value = text;
  textArea.style.position = 'fixed';
  textArea.style.left = '-999999px';
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  try {
    document.execCommand('copy');
    showCopyConfirmation(buttonElement);
  } catch (err) {
    console.error('Copy fallback failed', err);
  }
  document.body.removeChild(textArea);
}

function showCopyConfirmation(buttonElement) {
  const originalText = buttonElement.textContent;
  buttonElement.textContent = 'Copied!';
  buttonElement.classList.add('copied');
  setTimeout(() => {
    buttonElement.textContent = originalText;
    buttonElement.classList.remove('copied');
  }, 2000);
}

/* ==========================================================================
   5. AUTOMATA STRING TRACER (Case Study: a(b|c))
   Educational tracer demonstrating DFA transitions step-by-step
   ========================================================================== */

/**
 * Traces input string execution on the Minimal DFA for language L = {ab, ac}
 * States:
 *   A  - Start state
 *   B  - State reached after scanning 'a'
 *   CD - Accepting state reached after scanning 'ab' or 'ac'
 *   T  - Dead/Trap state
 */
function traceAutomata(input) {
  if (!automataTraceResult) return;

  if (input === '') {
    automataTraceResult.className = 'tester-trace-result trace-rejected';
    automataTraceResult.textContent = 'Empty string (ε) rejected: The automaton requires a non-empty string starting with "a".';
    return;
  }

  let currentState = 'A';
  const steps = [`Initial State: A`];
  let rejectedEarly = false;

  for (let i = 0; i < input.length; i++) {
    const char = input[i];
    let nextState = 'T';

    if (currentState === 'A') {
      if (char === 'a') nextState = 'B';
      else nextState = 'T';
    } else if (currentState === 'B') {
      if (char === 'b' || char === 'c') nextState = 'CD';
      else nextState = 'T';
    } else if (currentState === 'CD') {
      // Any character after accepting state leads to dead state (no string in L has length > 2)
      nextState = 'T';
    } else if (currentState === 'T') {
      nextState = 'T';
    }

    steps.push(`δ(${currentState}, '${char}') → ${nextState}`);
    currentState = nextState;
  }

  const isAccepted = (currentState === 'CD');

  if (isAccepted) {
    automataTraceResult.className = 'tester-trace-result trace-accepted';
    automataTraceResult.innerHTML = `
      <strong>STRING ACCEPTED!</strong> The input string "<code>${escapeHtml(input)}</code>" belongs to <em>L</em> = {ab, ac}.<br>
      <span style="font-size: 0.8rem; opacity: 0.9;">Transition Path: ${steps.join('  ⟹  ')} (Halted in accepting state CD)</span>
    `;
  } else {
    automataTraceResult.className = 'tester-trace-result trace-rejected';
    const reason = currentState === 'T'
      ? 'Trapped in dead/sink state T (invalid prefix or excess characters).'
      : `Halted in non-accepting state "${currentState}".`;
    automataTraceResult.innerHTML = `
      <strong>STRING REJECTED!</strong> The input string "<code>${escapeHtml(input)}</code>" does not belong to <em>L</em>.<br>
      <span style="font-size: 0.8rem; opacity: 0.9;">Reason: ${reason}<br>Transition Path: ${steps.join('  ⟹  ')}</span>
    `;
  }
}

function setupAutomataQuickPills() {
  const pills = document.querySelectorAll('.quick-pill');
  pills.forEach(pill => {
    pill.addEventListener('click', () => {
      const val = pill.getAttribute('data-value');
      if (automataInput) {
        automataInput.value = val;
        traceAutomata(val);
      }
    });
  });
}

function escapeHtml(str) {
  return str.replace(/[&<>"']/g, m => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  })[m]);
}

/* ==========================================================================
   6. EVENT LISTENERS SETUP
   ========================================================================== */

function setupEventListeners() {
  // Rule selector change
  ruleSelect.addEventListener('change', (e) => {
    updateSelectedRuleUI(e.target.value);
  });

  // Validate button click
  btnValidate.addEventListener('click', () => {
    validateInput();
  });

  // Enter key press inside input field
  inputField.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      validateInput();
    }
  });

  // Clear button click
  btnClear.addEventListener('click', () => {
    clearForm();
  });

  // Automata tracer button
  if (btnTraceAutomata && automataInput) {
    btnTraceAutomata.addEventListener('click', () => {
      traceAutomata(automataInput.value);
    });

    automataInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        traceAutomata(automataInput.value);
      }
    });
  }
}

// Start application when DOM is ready
document.addEventListener('DOMContentLoaded', initApp);
