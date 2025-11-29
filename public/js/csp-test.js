// CSP Test Script - This external script should work
document.addEventListener('DOMContentLoaded', function() {
    console.log('External script loaded successfully');
    
    // Test 1: Check if inline script was blocked
    const inlineTest = document.getElementById('inline-test');
    if (inlineTest) {
        if (inlineTest.textContent.includes('Waiting for test')) {
            inlineTest.textContent = '✓ PASS: Inline script was blocked by CSP';
            inlineTest.style.background = '#d4edda';
        }
    }
    
    // Test 3: Try to use eval() - should be blocked
    const evalTest = document.getElementById('eval-test');
    if (evalTest) {
        try {
            eval('console.log("eval executed")');
            evalTest.textContent = '❌ FAIL: eval() was not blocked by CSP';
            evalTest.style.background = '#f8d7da';
        } catch (e) {
            evalTest.textContent = '✓ PASS: eval() blocked by CSP - Error: ' + e.name;
            evalTest.style.background = '#d4edda';
            console.log('eval blocked correctly:', e);
        }
    }
    
    // Test 4: Verify external script works
    const externalTest = document.getElementById('external-test');
    if (externalTest) {
        externalTest.textContent = '✓ PASS: External script executed successfully';
        externalTest.style.background = '#d4edda';
    }
    
    console.log('All CSP tests completed. Check results above.');
});
