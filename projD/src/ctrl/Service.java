package ctrl;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import model.Mortgage;

/**
 * Servlet implementation class Service
 */
@WebServlet({ "/Service", "*.do" })
public class Service extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public Service() {
        super();
    }
    public void init() throws ServletException 
	{
		super.init();
		try
		{
			Mortgage model = new Mortgage();
			this.getServletContext().setAttribute("model",model);		
		}
		catch(Exception e)
		{
			throw new ServletException("Init exception........");
		}

	}
	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		Mortgage m = (Mortgage)this.getServletContext().getAttribute("model");
		//---------------------------------------------------------
		String principle = request.getParameter("principle");
		String interest =request.getParameter("interest"); 
		String amort = request.getParameter("amort");
		String bank = request.getParameter("bank");
		String payment = m.servePayment(principle, amort,interest);
		//System.out.println("ammm"+ amort);
		response.setHeader("Content-Type", "text/plain");
		response.getWriter().println(payment);

		
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		doGet(request, response);
	}

}
