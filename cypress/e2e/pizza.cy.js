describe("Sipariş Formu Testleri", () => {

  // Bu blok, aşağıdaki TÜM 3 testten önce çalışacak
  beforeEach(() => { 
    cy.visit('http://localhost:5173/order');
  });

  // Test 1
  it("isim inputuna bir metin girmeli", () => { 
    cy.get('input[name="isim"]').type('Emre');
    cy.get('input[name="isim"]').should('have.value', 'Emre');
  });

  // Test 2
  it('birden fazla malzeme seçebilmeli', () => { 
    cy.get('input[value="Sosis"]').check();
    cy.get('input[value="Mısır"]').check();
    cy.get('input[value="Zeytin"]').check();

    cy.get('input[value="Sosis"]').should('be.checked');
    cy.get('input[value="Mısır"]').should('be.checked');
    cy.get('input[value="Zeytin"]').should('be.checked');
  });
  
  // Test 3
  it('formu doldurup gönderebilmeli', () => {
    // 1. API isteğini dinle
    cy.intercept('POST', 'https://reqres.in/api/users').as('apiReq');

    // 2. Formu geçerli hale getir
    cy.get('input[name="isim"]').type('Test Kullanıcısı');
    cy.get('input[value="M"]').check(); // Boyut seç
    
    // 4 malzeme seç
    cy.get('input[value="Sosis"]').check();
    cy.get('input[value="Mısır"]').check();
    cy.get('input[value="Zeytin"]').check();
    cy.get('input[value="Biber"]').check();

    cy.get('textarea[name="özel"]').type('Test notu');

    // 3. Butonun tıklanabilir olduğunu doğrula
    cy.get('button[type="submit"]').should('not.be.disabled');

    // 4. Formu gönder
    cy.get('button[type="submit"]').click();

    // 5. API isteğinin 401 yanıtı verdiğini doğrula
    cy.wait('@apiReq').its('response.statusCode').should('eq', 401);
  });

}); // <-- EN DIŞTAKİ DESCRIBE BLOĞU BURADA KAPANIR