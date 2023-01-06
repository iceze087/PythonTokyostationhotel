from flask import Flask, render_template,request,flash, jsonify , make_response
from flask_cors import CORS
import mysql.connector
# Create Server
app = Flask(__name__)

# host = 'localhost'
# user = 'root'
# password = ''
# db = 'tokyostationhotel'

host = '147.50.231.21'
user = 'iceze087'
password = 'Iceze_0871919941'
db = 'tokyostationhotel'

mydb = mysql.connector.connect(host=host , user=user , password=password ,db=db)

@app.route("/")
def index():
    return render_template("Tokyo_index.html")

@app.route('/searchroom', methods=['POST'])
def searchroom():
    searchroom = mydb.cursor(dictionary=True)
    checkin = request.form['reserve_checkindate']
    checkout = request.form['reserve_checkoutdate']
    value = (checkin, checkout)
    searchroom.execute("select *from room_reserve where reserve_checkindate = %s and reserve_checkoutdate = %s" , value)
    print(value)
    searchresult = searchroom.fetchall()
    print(searchresult)
    if searchresult == []:
        print('is empty')
        selectall = mydb.cursor(dictionary=True)
        selectall.execute("select *from room")
        room = selectall.fetchall()
        return render_template("searchroom.html", roomdata = room)
    elif searchresult != []:
        print('not empty room id = ' )
        selectnotavali = mydb.cursor(dictionary=True)
        selectnotavali.execute("select room_id from room_reserve where reserve_checkindate = %s and reserve_checkoutdate = %s" , value)
        roomnot = selectnotavali.fetchall()
        roomid = [roomnot[0]['room_id']]
        selectnotavali.execute("select * from room where room_id != %s" , roomid)
        room = selectnotavali.fetchall()
        print(room)
        return render_template("searchroom.html", roomdata = room)
    return render_template("searchroom.html")

@app.route('/selectlocation')
def selectlocation():
    selectprovinces = mydb.cursor(dictionary=True)
    selectprovinces.execute('SELECT id , name_th FROM provinces')
    provincesdata = selectprovinces.fetchall()
    # ------------------------------------------------
    selectamphures = mydb.cursor(dictionary=True)
    selectamphures.execute('SELECT id , name_th , province_id FROM amphures')
    amphuresdata = selectamphures.fetchall()
    # ------------------------------------------------
    selectdistricts = mydb.cursor(dictionary=True)
    selectdistricts.execute('SELECT id , name_th , amphure_id FROM districts;')
    districtsdata = selectdistricts.fetchall()
    # ------------------------------------------------
    return make_response(jsonify(provincesdata , amphuresdata ,districtsdata),200)

@app.route('/inputdata')
def inputdata():
    return render_template('inputreservedata.html')

# @app.route("/")
# def index():
#     # mycursor = mydb.cursor(dictionary=True)
#     # mycursor.execute("select *from product_list")
#     # myresult1 = mycursor.fetchall()
#     # print(myresult1)
#     # mycursor.execute("select *from product_list where product_id = 26")
#     # myresult2 = mycursor.fetchall()
#     # print(myresult2)
#     # # name age
#     # data = {
#     #     'name' : 'ice',
#     #     'age' : 25,
#     #     'gfname' : "baitui"
#     # }

#     # Knowledge = ["HTML" , "Javascript" , "CSS" , "React" , "Nodejs"]
#     # return render_template("Tokyo_index.html",profile = data, skill = Knowledge)

#     return render_template("Tokyo_index.html")

# @app.route("/profile/<name>/<lastname>")
# def profile(name, lastname):
#     return render_template("profile.html")

# @app.route('/senddata')
# def inputname():
#     flash('บันทึกข้อมูลเรียบร้อย')
#     name = request.args.get('name')
#     lastname = request.args.get('lastname')
#     return render_template("showdata.html",userinfo = {"name":name,"lastname":lastname})

# @app.route('/inputgf', methods=['POST'])
# def inputgf():
#     GFname = request.form['GFname']
#     GFlastname = request.form['GFlastname']
#     return render_template("showdataGF.html",GFuserinfo = {"GFname":GFname,"GFlastname":GFlastname})


if __name__ == "__main__":
    app.run(debug=True)
