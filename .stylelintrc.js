module.exports = {
  extends: ['stylelint-config-standard-scss', 'stylelint-config-rational-order'],
  customSyntax: 'postcss-scss',
  plugins: ['stylelint-scss'],
  rules: {
    indentation: 2,
    'no-missing-end-of-source-newline': null,
    'max-nesting-depth': null,
    'at-rule-no-unknown': null,
    'scss/at-rule-no-unknown': true,
    // 拒绝文件命名使用kebab-case规则！！！！
    'selector-class-pattern': null,
    'string-quotes': 'single',
    'at-rule-empty-line-before': null,
    'at-rule-no-unknown': null,
    'at-rule-name-case': 'lower',
    'length-zero-no-unit': true,
    'scss/at-rule-no-unknown': true,
    'shorthand-property-no-redundant-values': true,
    'number-leading-zero': 'never',
    'declaration-block-no-duplicate-properties': true,
    'no-descending-specificity': true,
    'selector-max-id': 0,
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: ['global']
      }
    ],
    indentation: [
      2,
      {
        severity: 'warning'
      }
    ]
  }
}
